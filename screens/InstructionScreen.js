import React, { Component } from 'react'
import { Text, View, ScrollView, Button, Image,ActivityIndicator, Picker, 
    TextInput, KeyboardAvoidingView, TouchableOpacity, BackHandler, Platform, StyleSheet } from 'react-native';
import NavigationUtil from '../navigation/NavigationUtil';
import * as Icon from '@expo/vector-icons';
import { Header } from 'react-native-elements';


export default class InstructionScreen extends Component {
    _isMounted = false;

  constructor(props){
    super(props);

    this.state = {
      laserTop: 0,
    }
  }
  
  componentDidMount(){
    this._isMounted = true;

    // animation effect for logo

    let goUp = false;
    setInterval(() => {
      if(goUp){
        if(this.state.laserTop > -10){
          if(this._isMounted) this.setState({laserTop: this.state.laserTop-1})
        }
        else goUp = false;
      }
      else{
        if(this.state.laserTop < 150) if(this._isMounted) this.setState({laserTop: this.state.laserTop+1})
        else goUp = true;
      }
    }, 10)
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.screen}>
        <Header
        placement="center"
        leftComponent={
          <TouchableOpacity
              style={{
                height: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5
              }}
              onPress={NavigationUtil.goBack}
            >
              <Icon.Ionicons
                name="ios-arrow-round-back"
                size={35}
                color="#fff"
              />
            </TouchableOpacity>
        }
        // centerComponent={<Text style={[theme.fonts.bold20, { color: "#fff" }]}>Đăng ký thông tin</Text>}
        // rightComponent={{ icon: 'home', color: '#fff' }}
      />
        <View style={[styles.container,{alignItems: 'center',}]}>
          <View style={{marginBottom: 100, marginTop: 100}}>
            <Image
              style={[styles.logo, {marginBottom: 50, marginTop: 0}]}
              source={require('../assets/images/logo.png')}
            />
            <View style={[styles.laser, {top: this.state.laserTop}]}></View>
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10,}}>Chuẩn bị thu thập</Text>
          <Text style={{fontSize: 16, textAlign: 'center'}}>Đầu tiên, điều chỉnh điện thoại để mặt có bạn có trong khung hình. Rồi thực hiện các thao tác quay mặt sang trái, phải,... theo chỉ dẫn. {"\n\n"}Chú ý: tăng âm lượng để nghe rõ chỉ dẫn</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextbutton}  onPress = {() => NavigationUtil.navigate("CaptureScreen")}>
            <Text style={[styles.buttontext, {fontSize: 22}]}>BẮT ĐẦU</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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

