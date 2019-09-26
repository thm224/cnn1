import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  Image,
  ActivityIndicator,
  Picker,
  AsyncStorage,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  BackHandler,
  Platform,
  StyleSheet
} from "react-native";
import {checkUserName} from "../constants/Api"
import NavigationUtil from "../navigation/NavigationUtil";
import * as Icon from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import * as theme from "../constants/Theme";

export default class FormScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonOpacity: 0.5,
      disableButton: true,
      name: "",
      userName: "",
      class: "10A1",
      hasFocusedName: "",
      userNameExist: false,
      hasFocusedUserName: ""
    };
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
        centerComponent={<Text style={[theme.fonts.bold20, { color: "#fff" }]}>Đăng ký thông tin</Text>}
        // rightComponent={{ icon: 'home', color: '#fff' }}
      />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text
            style={
              this.state.hasFocusedName
                ? styles.textinputlabel_focused
                : styles.textinputlabel
            }
          >
            Họ và tên
          </Text>
          <TextInput
            style={
              this.state.hasFocusedName ? styles.input_focused : styles.input
            }
            onFocus={() => {
              this.setState({ hasFocusedName: true });
            }}
            onBlur={() => {
              if (this.state.name == "") {
                this.setState({ hasFocusedName: false });
              }
              this.checkForm();
            }}
            onChangeText={value => {
              this.setState({ name: value });
              this.checkForm();
            }}
          />

          <Text
            style={
              this.state.hasFocusedUserName
                ? styles.textinputlabel_focused
                : styles.textinputlabel
            }
          >
            Tên Đăng Nhập
          </Text>
          <TextInput
            style={
              this.state.hasFocusedUserName ? styles.input_focused : styles.input
            }
            onFocus={() => {
              this.setState({ hasFocusedUserName: true });
            }}
            onBlur={() => {
              if (this.state.name == "") {
                this.setState({ hasFocusedUserName: false });
              }
              this.checkForm();
            }}
            onChangeText={value => {
              this.setState({ userName: value });
              this.checkForm();
              // alert(value)
              // this.checkUser(value);
            }}
          />
          {this.state.userNameExist ? <Text style={{color: "#d91d14"}}>Tên đăng nhập đã tồn tại</Text>: null}
          <Text style={styles.textinputlabel_focused}>Lớp</Text>
          <Picker
            selectedValue={this.state.class}
            style={{ height: 30, width: "100%" }}
            onValueChange={(itemValue, itemIndex) =>{
              this.setState({ class: itemValue });
              alert(itemValue)
              console.log(this.state.class)
            }
            }
          >
            <Picker.Item
              label="10A1"
              value="10A1"
            />
            <Picker.Item
              label="10A2"
              value="10A2"
            />
            {/* <Picker.Item
              label="Khối QTNNL - Hà Nội"
              value="Khối QTNNL - Hà Nội"
            />
            <Picker.Item
              label="Khối QTNNL - Hồ Chí Minh"
              value="Khối QTNNL - Hồ Chí Minh"
            /> */}

          </Picker>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.nextbutton, { opacity: this.state.buttonOpacity }]}
            disabled={this.state.disableButton}
            onPress={async () => {
              global.name = this.state.name;
              global.userName = this.state.userName;
              global.class = this.state.class;

              if (this.checkForm()) {
                console.log(
                  `Name: ${global.name} - Class: ${
                    global.class
                  } - userName:${global.userName}`
                );
                this.checkUser(global.userName);
                // await AsyncStorage.setItem("id", `${global.id}`);
                
              }
            }}
          >
            <Text style={styles.buttontext}>TIẾP TỤC</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  checkUser = async (userName) => {
    console.log(userName)
    response = await checkUserName({'userName': userName})
    this.setState({userNameExist:response.isExist})
    console.log(this.state.userNameExist)
    if(!this.state.userNameExist){
      NavigationUtil.navigate("InstructionScreen");
    }
  };
  checkForm = () => {
    let hasCompleted =
      this.state.name != "" && this.state.class != "" && this.state.userName != "";
    this.setState({
      disableButton: hasCompleted ? false : true,
      buttonOpacity: hasCompleted ? 1 : 0.5
    });

    return hasCompleted;
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
    flex: 0.9
  },
  footer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center"
  },
  nextbutton: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3D88EC"
  },

  uploadButton: {
    flex: 0.3,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3D88EC",
    borderRadius: 5
  },

  buttontext: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },

  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 150,
    marginTop: 50,
    zIndex: 0
  },

  textinputlabel: {
    fontSize:20,
    color: "#9098A9"
  },

  textinputlabel_focused: {
    fontSize:20,
    color: "#3D88EC"
  },

  input: {
    height: 40,
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#C8CCD4"
  },

  input_focused: {
    height: 40,
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#3D88EC"
  },

  laser: {
    position: "absolute",
    backgroundColor: "red",
    height: 7,
    width: 150,
    opacity: 0.5,
    zIndex: 1
  },
  instructionText: {
    fontSize: 22,
    color: "white",
    marginBottom: 30
  },

  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "red",
    borderColor: "white",
    borderWidth: 5
  },

  stopCaptureButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "red",
    borderColor: "white",
    borderWidth: 5
  },

  preview: {
    // height: winWidth * 2,
    // width: winWidth,
    backgroundColor: "#294c73",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },

  camera: {
    // height: winWidth * 4/3,
    width: width,
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});
