import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen'
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';

const Auth = createStackNavigator({
  Login: LoginScreen,
})


export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: Auth,
  })
);
