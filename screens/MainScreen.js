import React, { Component } from "react";
import { Text, StyleSheet, AsyncStorage, View, TouchableOpacity, Image } from "react-native";
import ABBankHeader from '../components/ABBankHeader';
import NavigationUtil from "../navigation/NavigationUtil";
import { Header } from 'react-native-elements';
import {Logout} from "../constants/Api";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import * as theme from "../constants/Theme";

export default class MainScreen extends Component {
  _isMounted = false; // prevent warning about setState when navigating to another screen

  constructor(props) {
    super(props);

    this.state = {
      imageOpacity: 0,
      animationHeight: 50
    };
  }
  componentDidMount() {
    this._isMounted = true;
    // animation effect for logo
    setInterval(() => {
      if (this.state.imageOpacity < 1) {
        if (this._isMounted)
          this.setState({ imageOpacity: this.state.imageOpacity + 0.01 });
      }

      if (this.state.animationHeight > 0) {
        if (this._isMounted)
          this.setState({ animationHeight: this.state.animationHeight - 1.5 });
      }
    }, 1);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  logOut = async() => {
    id = await AsyncStorage.getItem('id')
    deviceId = await AsyncStorage.getItem('deviceID')
    let payload = {
      userID:id,
      deviceID:deviceId
    }
    console.log(payload)
    await Logout(payload);
    await AsyncStorage.removeItem('id');
    id = await AsyncStorage.getItem('id');
    NavigationUtil.navigate("Login")
    console.log(id)
  }
  render() {
    return (
      <View style={styles.screen}>
      <Header
        placement="center"
        leftComponent={{ icon: 'home', color: '#fff' }}
        centerComponent={<Text style={[theme.fonts.bold20, { color: "#fff" }]}>Trang chủ</Text>}
        rightComponent={<Menu
          ref={this.setMenuRef}
          button = {<TouchableOpacity onPress={this.showMenu}>
          <Image 
             source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/menu_icon.png'}} 
             style={{width: 30, height: 30}} 
             
           />
           </TouchableOpacity>}
          // button={<Text onPress={this.showMenu}><Icon.Ionicons name="ios-arrow-round-back" size={35} color="#fff"/></Text>}
      >
          <MenuItem onPress={() => this.logOut()}>Đăng xuất</MenuItem>
      </Menu>}
      />
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../assets/images/CNN.png")}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress = {() => NavigationUtil.navigate("InstructionMusterScreen")}>
            <Text style={styles.buttontext}>Điểm danh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress = {() => NavigationUtil.navigate("ChooseClassScreen")}>
            <Text style={styles.buttontext}>Xem kết quả điểm danh</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginBottom: 150,
    // marginTop: 50,
    zIndex: 0
  },
  button: {
    // height: '100%',
    width: '85%',
    height: 60,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 23,
    justifyContent: 'center',
    backgroundColor: '#3D88EC',
    // marginTop: 50
  },
  button1: {
    // height: '100%',
    width: '85%',
    height: 60,
    borderRadius: 23,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: '#413e45',
    // marginTop: 50
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
