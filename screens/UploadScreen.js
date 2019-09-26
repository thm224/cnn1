import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native'
import reactotron from 'reactotron-react-native';
import NavigationUtil from '../navigation/NavigationUtil';

export default class UploadScreen extends Component {
    async componentDidMount(){
        try {
          const res = await fetch('http://office.infore.vn/visiai/cnn/checkin/upload', {
            method: "POST",
            body: global.dataPer
          });
          NavigationUtil.navigate("FinishScreen")
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