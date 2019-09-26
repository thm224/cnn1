import React, { Component } from 'react'
import { Text, View, ScrollView, Button, Image,ActivityIndicator, Picker, 
    TextInput, KeyboardAvoidingView, TouchableOpacity, BackHandler, Platform, StyleSheet, AsyncStorage } from 'react-native';

import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";
import NavigationUtil from '../navigation/NavigationUtil';

export default class CaptureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // disableButton = false,
      deviceID: null,
      hasCameraPermission: null,
      instruction: "Nhấn nút quay để bắt đầu",
      cameraButton: (
        <TouchableOpacity
          onPress={this.startRecording.bind(this)}
          style={styles.captureButton}
        />
      )
    };
  }
  async componentDidMount() {
    const camera = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
      Permissions.AUDIO_RECORDING
    );
    deviceID = await AsyncStorage.getItem('deviceID')
    this.setState({ hasCameraPermission: camera.status === "granted", deviceID: deviceID });
    Audio.setIsEnabledAsync(true);
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission == null) return <View />;
    else if (hasCameraPermission == false)
      return <Text>No access to camera!</Text>;
    else {
      return (
        <View style={styles.screen}>
          <View style={[styles.container, { flex: 0.6 }]}>
            <Camera
              style={styles.camera}
              ref={camera => (this.camera = camera)}
              type="front"
            />
          </View>
          <View style={[styles.footer, { flex: 0.4, backgroundColor: "#444" }]}>
            <Text style={styles.instructionText}>{this.state.instruction}</Text>
            {this.state.cameraButton}
          </View>
        </View>
      );
    }
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // playSound = async() => {
  //   Audio.setIsEnabledAsync(true);
  //   const sound = new Audio.Sound();

  //   await sound.loadAsync(require('./assets/audio/front.mp3'));
  //   await sound.playAsync();
  // }

  async playSound(source) {
    try {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: true }
      );

      console.log("Played sound!");
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  // TODO: add audio
  instructions() {
    const instructionAudioSources = [
      require("../assets/audio/left.mp3"),
      require("../assets/audio/right.mp3"),
      require("../assets/audio/down.mp3"),
      require("../assets/audio/up.mp3"),
      require("../assets/audio/smile.mp3"),
      require("../assets/audio/closeeyes.mp3"),
      require("../assets/audio/done.mp3"),
      require("../assets/audio/upload.mp3")
    ];
    instructionList = [
      "Quay mặt sang trái",
      "Quay mặt sang phải",
      "Cúi mặt xuống",
      "Ngẩng mặt lên",
      "Cười lên nào",
      "Xin hãy nhắm mắt",
      "Đã lấy dữ liệu xong",
      "Nhấn nút để tải dữ liệu lên server"
    ];

    for (let i = 0; i < 9; i++) {
      setTimeout(
        function() {
          if (i !== 8) {
            console.log(instructionList[i]);
            this.setState({ instruction: instructionList[i] });
            this.playSound(instructionAudioSources[i]);
            console.log(i);
          } else {
            console.log(1)
            this.setState({ processing: true, instruction: null });
            this.setUploadButton();
            this.camera.stopRecording();
            console.log(1)
            // button = (
            //   <TouchableOpacity
            //     onPress={this.stopRecording.bind(this)}
            //     style={styles.stopCaptureButton}
            //     disabled={false}
            //   />
            // );
            // this.setState({ cameraButton: button });
          }
        }.bind(this),
        4000 * (i + 1)
      );
    }
  }

  setStopRecordingButton() {
    button = (
      <TouchableOpacity
        onPress={this.stopRecording.bind(this)}
        style={[styles.stopCaptureButton, { opacity: 0 }]}
        disabled={true}
      />
    );
    console.log("Recording");
    this.setState({ cameraButton: button });
  }

  setUploadButton() {
    button = (
      <TouchableOpacity
        onPress={() => NavigationUtil.navigate("UploadScreen")}
        style={styles.uploadButton}
      >
        <Text style={styles.buttontext}>TẢI LÊN</Text>
      </TouchableOpacity>
    );
    this.setState({ cameraButton: button });
  }
  async startRecording() {
    await this.setStopRecordingButton();
    this.instructions();

    // default to mp4 for android as codec is not set
    await this.setState({ recording: true });
    const { uri, codec = "mp4" } = await this.camera.recordAsync({
      mute: true,
      quality: "4:3"
    });

    this.setState({ recording: false, processing: true });
    const type = `video/${codec}`;

    const data = new FormData();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();

    today =
      dd + "/" + mm + "/" + yyyy + " " + hours + ":" + minutes + ":" + seconds;
    console.log(today);
    data.append("video", {
      name: today,
      type,
      uri
    });
    const info = {
      name: global.name,
      userName: global.userName,
      class: global.class,
      deviceID: this.state.deviceID
    };
    data.append("info", {
      name: "info",
      string: JSON.stringify(info),
      type: "application/json"
    });
    global.dataPer = data;
    console.log(global.class);

    console.log(this.state.recording);
    this.setState({ processing: false });
  }
  stopRecording() {
    console.log(1)
    this.setState({ processing: true, instruction: null });
    this.setUploadButton();
    this.camera.stopRecording();
    console.log(2)
  }
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      padding: 20,
      flex: .9,
    },
    footer: {
      flex: .1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nextbutton: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3D88EC',
    },

    uploadButton: {
      flex: 0.3,
      width: '70%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3D88EC',
      borderRadius: 5,
    },

    buttontext: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },

    logo: {
      width:150, 
      height:150, 
      alignSelf: 'center', 
      marginBottom: 150,
      marginTop: 50,
      zIndex: 0,
    },

    textinputlabel: {
      color: '#9098A9',
    },

    textinputlabel_focused: {
      color: '#3D88EC',
    },

    input: {
      height:40,
      marginBottom: 10,
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#C8CCD4',
    },

    input_focused: {
      height:40,
      marginBottom: 10,
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#3D88EC',
    },

    laser: {
      position: 'absolute',
      backgroundColor: 'red',
      height: 7,
      width: 150,
      opacity: 0.5,
      zIndex: 1,
    },
    instructionText: {
      fontSize: 22,
      color: 'white',
      marginBottom: 30,
    },

    captureButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'red',
      borderColor: 'white',
      borderWidth: 5,
    },

    stopCaptureButton: {
      width: 80,
      height: 80,
      borderRadius: 10,
      backgroundColor: 'red',
      borderColor: 'white',
      borderWidth: 5,
    },

    preview: {
      // height: winWidth * 2,
      // width: winWidth,
      backgroundColor: '#294c73',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },

    camera: {
      // height: winWidth * 4/3,
      width: width,
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });


