import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  AsyncStorage,
  ScrollView,
  Image,
  RefreshControl
} from "react-native";
import { showMessages } from "../components/Alert";
import ABBankHeader from "../components/ABBankHeader";
import i18n from "ex-react-native-i18n";
import Mockup from "../constants/Mockup";
import Block from "../components/Block";
import * as Icon from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import * as theme from "../constants/Theme";
import { StackActions, NavigationActions } from "react-navigation";
import { requestGetListNoti } from "../constants/Api";
import reactotron from "reactotron-react-native";
import I18n from "../i18n/i18n";
import Loading from "../components/Loading";

const mockData = Mockup;
export default class LinksScreen extends Component {
  constructor(props) {
    super(props);
    let data = this.props.navigation.getParam("data", "");
    this.state = {
      content: [],
      isLoading: true,
      refreshing: true
    };
  }
  renderSeparator = () => {
    return <Divider style={{ marginHorizontal: 8 }} />;
  };
  renderNotification(item, i) {
    return (
      <Block row style={{ marginVertical: 8, marginHorizontal: 6 }}>
        <Icon.SimpleLineIcons
          name="location-pin"
          size={20}
          color={theme.colors.gray}
        />
        <Block style={{ marginHorizontal: 6 }}>
          <Text style={{ fontSize: 16 }}>{item}</Text>
          {/* <Text style = {{marginTop: 4, color: theme.colors.gray}}>{item.time}</Text> */}
        </Block>
      </Block>
    );
  }
  renderBody() {
    if (this.state.isLoading) return <Loading />;
    if (this.state.content.length == 0 && !this.state.isLoading)
      return (
        <Empty refreshing={this.state.refreshing} onRefresh={this.getData} />
      );
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.content}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => this.renderNotification(item, index)}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData} />
          }
        />
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ABBankHeader title={i18n.t("notification")} />
        {this.renderBody()}
      </View>
    );
  }

  getData = async () => {
    this.setState({ refreshing: true });
    id = await AsyncStorage.getItem("id");
    let payload = {
      id: id
    };
    try {
      response = await requestGetListNoti(payload);
      this.setState({
        content: response.content,
        isLoading: false,
        refreshing: false
      });
    } catch (error) {
      showMessages("Thông báo", "Lỗi server", async () => {
        // await AsyncStorage.setItem("content", this.state.content);
        // this.props.navigation.dispatch(resetAction);
      });
    }
  };

  componentDidMount() {
    this.getData();
  }
}

class Empty extends Component {
  render() {
    const refreshing = this.props.refreshing;
    const onRefresh = this.props.onRefresh;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          backgroundColor: "#eeeff3"
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: "5%"
          }}
        >
          <Image
            source={require("../assets/images/notify_empty.png")}
            style={{
              resizeMode: "contain",
              width: "100%",
              height: theme.dimension.width / 2
            }}
          />
          <Text
            style={[
              theme.fonts.bold18,
              {
                marginTop: 0
              }
            ]}
          >
            {I18n.t("empty_notify")}
          </Text>
          <Text
            style={[
              theme.fonts.light18,
              {
                marginTop: 10,
                marginBottom: 10,
                color: theme.colors.black2,
                textAlign: "center"
              }
            ]}
          >
            {I18n.t("description_notify")}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
