import {
  put,
  takeEvery,
  call,
  delay,
  cancelled,
  cancel
} from "redux-saga/effects";
import { AsyncStorage } from "react-native";
import I18n from "../../i18n/i18n";
import * as API from "../../constants/Api";
import reactotron from "reactotron-react-native";
import NavigationUtil from "../../navigation/NavigationUtil";
import { showMessages, showConfirm } from "../../components/Alert";