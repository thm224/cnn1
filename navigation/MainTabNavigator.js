import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  BottomTabBar
} from "react-navigation";
import * as Icon from "@expo/vector-icons";
import * as theme from "../constants/Theme";
import I18n from "../i18n/i18n";

import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import IntroduceScreen from '../screens/IntroduceScreen';
import FormScreen from '../screens/FormScreen'
import InstructionScreen from '../screens/InstructionScreen';
import CaptureScreen from '../screens/CaptureScreen';
import UploadScreen from '../screens/UploadScreen';
import FinishScreen from '../screens/FinishScreen';
import ConfirmDialog from '../screens/ConfirmDialog';
import MainScreen from '../screens/MainScreen'
import LoginScreen from '../screens/LoginScreen';
import InstructionMusterScreen from '../screens/InstructionMusterScreen'
import MusterCaptureScreen from '../screens/MusterCaptureScreen'
import ResultMusterScreen from '../screens/ResultMusterScreen'
import MusterUploadScreen from '../screens/MusterUploadScreen'
import ChooseClassScreen from '../screens/ChooseClassScreen'

const TabBarComponent = props => <BottomTabBar {...props} />;
const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let iconName = "basket";
  switch (routeName) {
    case "HomeScreen": {
      iconName = "diamond";
      break;
    }
    case "LinksScreen": {
      iconName = "bell";
      break;
    }
    case "SettingsScreen": {
      iconName = "user";
      break;
    }
  }
  return (
    <Icon.SimpleLineIcons name={iconName} size={20} color={tintColor} outline />
  );
};

const bottomBar = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      title: I18n.t("home"),
      navigationOptions: {
        tabBarLabel: I18n.t("home")
      }
    },
    LinksScreen: {
      screen: LinksScreen,
      title: I18n.t("notification"),
      navigationOptions: {
        tabBarLabel: I18n.t("notification")
      }
    },
    SettingsScreen: {
      screen: SettingsScreen,
      title: I18n.t("account"),
      navigationOptions: {
        tabBarLabel: I18n.t("account")
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
      // tabBarLabel: ({ focused, tintColor }) => getTabBarLabel(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: theme.colors.blue2,
      inactiveTintColor: theme.colors.gray
      // style: {
      //   backgroundColor: theme.colors.white,
      //   height: 58
      // }
    },
    tabBarComponent: props => {
      return (
        <TabBarComponent
          {...props}
          onTabPress={props.onTabPress}
          style={{
            borderTopColor: theme.colors.primary,
            backgroundColor: theme.colors.white,
            height: 58
          }}
        />
      );
    }
  }
);

export default createStackNavigator(
  { Login: LoginScreen,
    bottomBar: {
      screen: bottomBar
    },
    ChooseClassScreen:ChooseClassScreen,
    MusterUploadScreen: MusterUploadScreen,
    MusterCaptureScreen:MusterCaptureScreen,
    ResultMusterScreen: ResultMusterScreen,
    InstructionMusterScreen:InstructionMusterScreen,
    MainScreen: MainScreen,
    FormScreen: FormScreen,
    IntroduceScreen: IntroduceScreen,
    InstructionScreen: InstructionScreen,
    CaptureScreen: CaptureScreen,
    UploadScreen: UploadScreen,
    FinishScreen: FinishScreen,
    ConfirmDialog: ConfirmDialog
  },
  {
    defaultNavigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
);
