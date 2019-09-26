import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { TextField } from "react-native-material-textfield";
import I18n from "../i18n/i18n";
import { showMessages } from "../components/Alert";
import { Login } from "../constants/Api";
import { Button } from "react-native-elements";
import NavigationUtil from "../navigation/NavigationUtil";

export default class LoginScreen extends Component {
  state = {
    account: "",
    password: ""
  };
  static navigationOptions = {
    header: null
  };
  login = async () => {
    console.log(this.state.account, this.state.password)
    if(this.state.account == "" || this.state.password == ""){
      showMessages("Lỗi đăng nhập", "Vui lòng nhập đầy đủ thông tin", async () => {
        // await AsyncStorage.setItem("content", this.state.content);
        // this.props.navigation.dispatch(resetAction);
      });
     }
     else{
      // NavigationUtil.navigate("Main")
    
      try{
        deviceID = await AsyncStorage.getItem('deviceID')
        let payload = {
          passWord:this.state.password,
          userName:this.state.account,
          deviceID:deviceID
        }
        payload = JSON.stringify(payload);
        console.log(payload)
      response = await Login(payload);
      console.log(response)
      message = response
      console.log(message)
      if(message == "student" || message == 'teacher'){
        NavigationUtil.navigate("MainScreen")
        await AsyncStorage.setItem("username", `${this.state.account}`);
      }
      else{
        showMessages("Lỗi đăng nhập", message, async () => {
        });
      }
    }catch(error){
      showMessages("Hệ thống đang bảo trì", "Đăng nhập thất bại", async () => {
        // await AsyncStorage.setItem("content", this.state.content);
        // this.props.navigation.dispatch(resetAction);
      });
    }
  }
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoStyle}
          source={require("../assets/images/logo2.png")}
        />
        <TextInput
          style={[styles.inputText, { marginTop: 30 }]}
          placeholder={I18n.t("account")}
          autoCapitalize="none"
          keyboardType="email-address"
          value={this.state.account}
          onChangeText={value => this.setState({ account: value })}
          placeholderTextColor={"#BBBBBB"}
        />
        <TextInput
          style={[styles.inputText, { marginTop: 20 }]}
          placeholder={I18n.t("password")}
          autoCapitalize="none"
          keyboardType="default"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={value => this.setState({ password: value })}
          placeholderTextColor={"#BBBBBB"}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => this.login()}
          // onPress={() => NavigationUtil.navigate("MainScreen")}
        >
          <Text style={styles.textLogin}>{I18n.t("login")}</Text>
        </TouchableOpacity>
        {/* <View
          style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}
        >
          <Text style={{ fontSize: 16 }}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity
            onPress={() => NavigationUtil.navigate("IntroduceScreen")}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View> */}
        

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => NavigationUtil.navigate("IntroduceScreen")}
        >
          <Text style={styles.textLogin}> Đăng ký dữ liệu khuôn mặt</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10 }}>version 1.0 </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputText: {
    width: "85%",
    backgroundColor: "white",
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 9,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    height: 45
  },
  buttonLogin: {
    width: width * 0.85,
    backgroundColor: "#3085D6",
    padding: 10,
    borderRadius: 23,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  buttonRegister: {
    width: width * 0.85,
    backgroundColor: "#413e45",
    padding: 10,
    borderRadius: 23,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  textLogin: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  }
});
