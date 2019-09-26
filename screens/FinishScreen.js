import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  Image,
  ActivityIndicator,
  Picker,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  BackHandler,
  Platform,
  StyleSheet
} from "react-native";
import NavigationUtil from "../navigation/NavigationUtil";
import { SCREEN_ROUTER } from "../constants/Constant";
import {StackActions, NavigationActions} from 'react-navigation'; 


export default class FinishScreen extends Component {
  state = {
    exitButton: null
  };
  componentDidMount() {
    // disable exitButton on iOS platform
    let button =
      Platform.OS === "ios" ? (
        <View />
      ) : (
        <TouchableOpacity
          style={[styles.nextbutton, { flex: 0.5 }]}
          onPress={() => NavigationUtil.navigate("Login")}
        >
          <Text style={[styles.buttontext]}>Kết thúc</Text>
        </TouchableOpacity>
      );

    this.setState({ exitButton: button });

    // log
    // console.log(global.name);
    // console.log(global.id);
    // console.log(global.branch);
  }

  render() {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({
                routeName: 'main'
            })
        ]
    })
    return (
      <View style={styles.screen}>
        <View style={[styles.container, { alignItems: "center" }]}>
          <View style={{ marginTop: 100 }}>
            <Image
              style={[styles.logo, { marginBottom: 50, marginTop: 0 }]}
              source={require("../assets/images/checkmark.png")}
            />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Hoàn tất !
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={[
                styles.nextbutton
              ]}
              onPress={() => NavigationUtil.navigate("Login")}
            >
              <Text style={[styles.buttontext]}>Xong</Text>
            </TouchableOpacity>
            {/* {this.state.exitButton} */}
          </View>
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
    color: "#9098A9"
  },

  textinputlabel_focused: {
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
