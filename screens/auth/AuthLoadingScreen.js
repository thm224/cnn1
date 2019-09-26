import React, { Component } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  AppState,
  NativeModules
} from "react-native";
import NavigationUtil from "../../navigation/NavigationUtil";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { getImage } from "../../constants/Api";
import {SCREEN_ROUTER} from '../../constants/Constant';
import reactotron from 'reactotron-react-native';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    console.log(existingStatus)
    let finalStatus = existingStatus;
    console.log(finalStatus)
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      console.log(status)
      finalStatus = status;
    }
    console.log(finalStatus)
    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    await AsyncStorage.setItem("deviceID", token);
    // await Clipboard.setString(token);
    // Clipboard.setString(token);
    console.log(token)

  }
  get_image = async (notification) => {
    let payload = {
      img_path:notification.data.img_path
    }
    response = await getImage(payload);
    uri = response.uri
    notification.data['uri'] = uri 
    console.log(notification)
    NavigationUtil.navigate("ConfirmDialog", {
      data: notification.data
    })
  };
  _handleNotification = notification => {
    // if (
    //   AppState.currentState == "background" ||
    //   AppState.currentState == "inactive"
    // ) {
    //   if (Object.entries(notification.data).length !== 0)
    //     NavigationUtil.navigate("OrderDetail", {
    //       detailOrder: notification.data
    //     });
    // }
    // if (AppState.currentState === "active") {
    //   // Notifications.dismissAllNotificationsAsync()
    //   // Notifications.setBadgeNumberAsync(0)
    // }
    // NavigationUtil.navigate("ConfirmDialog", {
    //   data: notification.data
    // })
    console.log(notification)
    this.get_image(notification);

  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("token");
    reactotron.log(userToken)
    if (userToken) {
        NavigationUtil.navigate(SCREEN_ROUTER.MAIN);
    } else {
      NavigationUtil.navigate(SCREEN_ROUTER.AUTH);
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <ActivityIndicator size="large" color="#000" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
