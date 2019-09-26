import React, { Component } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import * as theme from "../constants/Theme";
import { showMessages } from "../components/Alert";
import NavigationUtil from "../navigation/NavigationUtil";
import { requestConfirmCheckin } from "../constants/Api";
import reactotron from "reactotron-react-native";
import { StackActions, NavigationActions } from "react-navigation";
import LoadingProgress from "../components/LoadingProgress";
export default class ConfirmDialog extends Component {
  constructor(props) {
    super(props);
    let data = this.props.navigation.getParam("data", "");
    this.state = {
      isShowDialog: false,
      data: data,
      isLoading: false
    };
  }
  getData = async () => {
    this.setState({ isShowDialog: true });
    console.log(this.state.data.uri);
  };
  componentWillMount() {
    // this.setState({ isShowDialog: true });
    types = 'data:image/jpeg;base64,'
    this.state.data.uri = types+this.state.data.uri 
    console.log(this.state.data.uri );
    this.getData();
  }
  render() {
    return <View>{this.showDialog()}</View>;
  }

  async confirmCheckin(isCheckin, resetAction) {
    id = await AsyncStorage.getItem("id");
    try {
      let payload = {
        id: id,
        confirm: isCheckin,
        time: this.state.data.time,
        date: this.state.data.date
      };
      // try{
      response = await requestConfirmCheckin(payload);
      // }catch(e){
      //   console.log(e);
        // this.setState({ isShowDialog: false });
        // this.props.navigation.dispatch(resetAction);
      // }
      if (response == "success" && isCheckin) {
        this.setState({ isLoading: false });
        showMessages("Thông báo", "Checkin thành công ", async () => {
          // await AsyncStorage.setItem("content", this.state.content);
          this.setState({ isShowDialog: false });
          this.props.navigation.dispatch(resetAction);
        });
      }
    } catch (error) {
      console.log(error, "asd");
      if(isCheckin){
      this.setState({ isLoading: false });
      }
      showMessages("Thông báo", "Lỗi server. Xác nhận thất bại", async () => {
        // await AsyncStorage.setItem("content", this.state.content);
        this.setState({ isShowDialog: false });
        this.props.navigation.dispatch(resetAction);
      });
    }
  }

  showDialog() {
    //
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "bottomBar"
        })
      ]
    });

    return (
      <Modal
        transparent={true}
        visible={this.state.isShowDialog}
        animationType={"fade"}
        onRequestClose={() => this.setState({ isShowDialog: false })}
      >
        {this.state.isLoading && <LoadingProgress />}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
          <View style={styles.dialog}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
                Thông báo{" "}
              </Text>
              <Text
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center",
                  lineHeight: 40,
                  fontSize: 20
                }}
              >
                {this.state.data.content}
              </Text>
              <Image
                source={{uri: this.state.data.uri}}
                style={{width: 250, height: 300, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center",
                  lineHeight: 60,
                  fontSize: 20
                }}
              >
                Vui lòng xác nhận 
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: "red", padding: 10 }}
                  onPress={() => {
                    this.setState({ isShowDialog: false });
                    this.confirmCheckin(false, resetAction);
                    this.props.navigation.dispatch(resetAction);
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Hủy bỏ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: theme.colors.blue2,
                    padding: 10
                  }}
                  onPress={() => {
                    // showMessages("Thông báo", "Điểm danh thành công ");
                    // NavigationUtil.goBack();
                    this.setState({ isLoading: true });
                    this.confirmCheckin(true, resetAction);
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  dialog: {
    flex: 0,
    backgroundColor: "#fff",
    height: 500,
    width: "90%",
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 7
  }
});
