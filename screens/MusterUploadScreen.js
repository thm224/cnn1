import React, { Component } from 'react'
import { showMessages } from "../components/Alert";
import { Text, StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native'
import reactotron from 'reactotron-react-native';
import NavigationUtil from '../navigation/NavigationUtil';

export default class UploadScreen extends Component {

    async componentDidMount(){
        try {
          console.log(global.musterData)
          const res = await fetch('http://office.infore.vn/visiai/cnn/checkin/muster', {
            method: "POST",
            body: global.musterData
          });
          // NavigationUtil.navigate("FinishScreen");
          showMessages("", "Upload thành công", async () => {
            // await AsyncStorage.setItem("content", this.state.content);
            // this.props.navigation.dispatch(resetAction);
            NavigationUtil.navigate("MainScreen");
          });
        } catch (e) {
          console.error(e);
          alert('loi')
        }
      }
      render() {
        return (
          <View style={{flex: 1}}>
            <View style={{marginTop: 100}}>
            <ActivityIndicator animating size="large"  color="#0000ff"/>
            <Text style={{fontSize: 18, textAlign: 'center'}}>Dữ liệu đang được tải lên server, vui lòng đợi trong giây lát...</Text>
            </View>
          </View>
    
        );
      }
}

const styles = StyleSheet.create({})