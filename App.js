import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as Icon from "@expo/vector-icons";
import AppNavigator from "./navigation/AppNavigator";
import NavigationUtil from "./navigation/NavigationUtil";
import { Provider } from "react-redux";
import store from "./redux/store";
export default class App extends React.Component {
  if(__DEV__) {
    import("./ReactotronConfig").then(() =>
      // console.log("Reactotron Configured")
      {}
    );
  }

  state = {
    isLoadingComplete: false
  };

  render() {
    console.disableYellowBox = true;
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          {/* {Platform.OS === 'ios' && <StatusBar barStyle="default" />} */}
          <AppNavigator
            ref={navigatorRef =>
              NavigationUtil.setTopLevelNavigator(navigatorRef)
            }
          />
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require("./assets/images/empty.png"),
    
      ]),
      Font.loadAsync({
        ...Icon.SimpleLineIcons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        "roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
        "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
        "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
        "roboto-light-italic": require("./assets/fonts/Roboto-LightItalic.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
