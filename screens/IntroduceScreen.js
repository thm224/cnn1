import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import ABBankHeader from '../components/ABBankHeader';
import NavigationUtil from "../navigation/NavigationUtil";
import { Header } from 'react-native-elements';
import * as theme from "../constants/Theme";
import * as Icon from '@expo/vector-icons'



export default class IntroduceScreen extends Component {
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
        centerComponent={<Text style={[theme.fonts.bold20, { color: "#fff" }]}>Giới thiệu</Text>}
      />
        <View style={styles.container}>
          <View style={{ height: this.state.animationHeight }} />
          <Image
            style={[styles.logo, { opacity: this.state.imageOpacity }]}
            source={require("../assets/images/logo.png")}
          />
          <Text style={{ fontSize: 16 }}>
            Đây là ứng dụng thu thập dữ liệu học sinh phục vụ việc điểm danh bằng khuôn mặt.{"\n\n\n"}Nhấn tiếp tục để bắt đầu thu thập.
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextbutton} onPress = {() => NavigationUtil.navigate("FormScreen")}>
            <Text style={styles.buttontext}>TIẾP TỤC</Text>
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
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 150,
    marginTop: 50,
    zIndex: 0
  },
  nextbutton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3D88EC',
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
