import axios from "axios";
import { AsyncStorage, Alert } from "react-native";
import I18n from "../i18n/i18n";
import NavigationUtil from "../navigation/NavigationUtil";
import { showMessages } from "../components/Alert";
import reactotron from "reactotron-react-native";

// singleton  network client
function createAxios() {
  // AsyncStorage.setItem("token", '2323226DADAD') //full
  var axiosInstant = axios.create();
  axiosInstant.defaults.baseURL = "http://office.infore.vn/visiai/cnn/checkin/";
  axiosInstant.defaults.timeout = 20000;
  axiosInstant.defaults.headers = { "Content-Type": "application/json" };

  axiosInstant.interceptors.request.use(
    async config => {
      config.headers.token = await AsyncStorage.getItem("token");
      // console.log("Token: ", config.headers.token);
      return config;
    },
    error => Promise.reject(error)
  );

  axiosInstant.interceptors.response.use(response => {
    // console.log('Response:', response.data)
    if (response.data && response.data.code == 403) {
      setTimeout(() => {
        Alert.alert("Thông báo", I18n.t("relogin"));
      }, 200);

      AsyncStorage.setItem("token", "", () => {
        NavigationUtil.navigate("Auth");
      });
    } else if (response.data && response.data.status != 1) {
      if (response.data.message && response.data.message != "")
        setTimeout(() => {
          Alert.alert("Thông báo", response.data.message);
        }, 200);
    }
    return response;
  });
  return axiosInstant;
}

export const getAxios = createAxios();

/* Support function */
function handleResult(api) {
  return api.then(res => {
    // if (res.data.status != 1) {
    //   // console.log("Status != 1\n")
    //   return Promise.reject(new Error("Co loi xay ra"));
    // }
    // console.log("RequestSuccess\n");
    return Promise.resolve(res.data);
  });
}

export const checkUserName = (payload) => {
  return handleResult(getAxios.post('/check_user_exist', payload))
}

export const getDates = (payload) => {
  return handleResult(getAxios.post('/get_dates', payload))
}

export const sendResult = (payload) => {
  return handleResult(getAxios.post('/send_result', payload))
}

export const Logout = (payload) => {
  return handleResult(getAxios.post('/log_out', payload))
}

export const requestConfirmCheckin = (payload) => {
  return handleResult(getAxios.post('/confirm', payload))
}

export const Login = (payload) => {
  return handleResult(getAxios.post('/check_login', payload))
}

export const getListStudents = (payload) => {
  return handleResult(getAxios.post('/get_list_students', payload))
}

// Application api request
