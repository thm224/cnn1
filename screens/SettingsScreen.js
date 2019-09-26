import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
} from "react-native";
import ABBankHeader from "../components/ABBankHeader";
import i18n from "ex-react-native-i18n";
import { Avatar } from "react-native-elements";
import Mockup from "../constants/Mockup";
import Block from "../components/Block";
import * as Icon from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import * as theme from "../constants/Theme";
import {Logout} from "../constants/Api"
import NavigationUtil from "../navigation/NavigationUtil";
import { showConfirm } from "../components/Alert";



export default class SettingsScreen extends Component {
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
      <View style={{ flex: 1, backgroundColor: theme.colors.gray3 }}>
        <ABBankHeader title={i18n.t("account")} />
        <ScrollView>
          <Block row card style={{ marginHorizontal: 8 }}>
            <Avatar
              rounded
              showEditButton
              size={90}
              source={{
                uri:
                  "https://img-s2.onedio.com/id-5c98b1c58f1406e6153eca9b/rev-0/w-635/f-jpg-webp/s-59ec5a0c809b1cafc2e7d8344f3008f554b37cba.webp"
              }}
            />
            <Block style={{ marginHorizontal: 8 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>InfoRe</Text>
              <Text>3 Chùa Láng, Láng Thượng, Đống Đa, Hà Nội</Text>
              <Text>097 988 17 83</Text>
            </Block>
          </Block>

          <View
            style={{
              borderColor: theme.colors.gray,
              borderWidth: 1,
              flex: 1,
              marginHorizontal: 8,
              marginTop: 30,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 6
            }}
          >
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon.SimpleLineIcons
                  name="user"
                  size={20}
                  color={theme.colors.black2}
                />
                <Text
                  style={{
                    color: theme.colors.black2,
                    marginLeft: 10,
                    flex: 1
                  }}
                >
                  Cập nhật thông tin
                </Text>
                <Icon.MaterialIcons
                  name="keyboard-arrow-right"
                  size={18}
                  color={theme.colors.black2}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10
                }}
              >
                <Icon.SimpleLineIcons
                  name="lock"
                  size={20}
                  color={theme.colors.black2}
                />
                <Text
                  style={{
                    color: theme.colors.black2,
                    marginLeft: 10,
                    flex: 1
                  }}
                >
                  Đổi mật khẩu
                </Text>
                <Icon.MaterialIcons
                  name="keyboard-arrow-right"
                  size={18}
                  color={theme.colors.black2}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>{         
                showConfirm(
                  i18n.t("notification"),
                  "Bạn có muốn thoát khỏi ứng dụng",
                  () => this.logOut() 
                )
              }
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10
                }}
              >
                <Icon.SimpleLineIcons
                  name="logout"
                  size={20}
                  color={theme.colors.black2}
                />
                <Text
                  style={{
                    color: theme.colors.black2,
                    marginLeft: 10,
                    flex: 1
                  }}
                >
                  Đăng xuất
                </Text>
                <Icon.MaterialIcons
                  name="keyboard-arrow-right"
                  size={18}
                  color={theme.colors.black2}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
