import React, { Component } from 'react'
import { Text, View, ScrollView, Button, Image,ActivityIndicator, Picker, 
    TextInput, KeyboardAvoidingView, TouchableOpacity, BackHandler, Platform, StyleSheet } from 'react-native';
import NavigationUtil from '../navigation/NavigationUtil';
import * as Icon from '@expo/vector-icons';
import * as theme from "../constants/Theme";
import {getDates} from "../constants/Api"
import { Header } from 'react-native-elements';

export default class ChooseClassScreen extends Component {
    _isMounted = false;

  constructor(props){
    super(props);

    this.state = {
      Musterclass : '10A1',
      laserTop: 0,
      dates : [],
      date: '',
    }
  }
  
  componentDidMount(){
    this._isMounted = true;

    // animation effect for logo

    let goUp = false;
    setInterval(() => {
      if(goUp){
        if(this.state.laserTop > -10){
          if(this._isMounted) this.setState({laserTop: this.state.laserTop-1})
        }
        else goUp = false;
      }
      else{
        if(this.state.laserTop < 150) if(this._isMounted) this.setState({laserTop: this.state.laserTop+1})
        else goUp = true;
      }
    }, 10)

    this.get_dates(this.state.Musterclass);
  }

  componentWillUnmount(){
    this._isMounted = false;
  }
  get_dates = async(Musterclass) => {
    // alert(Musterclass)
    console.log (Musterclass)
    response = await getDates({"classID":Musterclass});
    this.setState({dates:response.dates})
    // console.log (this.state.Musterclass)
  }
  listDates = () =>{
    return( this.state.dates.map( (x,i) => { 
          return( <Picker.Item label={x} value={x}  />)} ));
}
  render() {
    return (
      <View style={styles.screen}>
        <Header
        placement="center"
        leftComponent={
          <TouchableOpacity
              style={{
                height: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5
              }}
              onPress={NavigationUtil.goBack}
            >
              <Icon.Ionicons
                name="ios-arrow-round-back"
                size={35}
                color="#fff"
              />
            </TouchableOpacity>
        }
        centerComponent={<Text style={[theme.fonts.bold20, { color: "#fff" }]}>Chọn kết quả</Text>}
        // rightComponent={{ icon: 'home', color: '#fff' }}
      />
        <View style={[styles.container,]}>
        <Text style={{fontSize: 20, fontWeight: 'bold',}}>Lớp</Text>
          <Picker
            selectedValue={this.state.Musterclass}
            style={{  width: "100%" }}
            onValueChange={(itemValue, itemIndex) =>{
              this.setState({ Musterclass: itemValue });
              this.get_dates(itemValue);
              }
            }
          >
            <Picker.Item
              label="10A1"
              value="10A1"
            />
            <Picker.Item
              label="10A2"
              value="10A2"
            />
            <Picker.Item
              label="10A3"
              value="10A3"
            />
            <Picker.Item
              label="10A4"
              value="10A4"
            />
          </Picker>
          <Text style={{fontSize: 20, fontWeight: 'bold',}}>Ngày giờ</Text>
          <Picker
            selectedValue={this.state.date}
            style={{  width: "100%" }}
            onValueChange={(itemValue, itemIndex) =>{
              this.setState({ date: itemValue });
              }
            }
          >
          { this.listDates() }
            </Picker>
          {/* <Text style={{fontSize: 16, textAlign: 'center'}}>Đầu tiên, điều chỉnh điện thoại để mặt có bạn có trong khung hình. Rồi thực hiện các thao tác quay mặt sang trái, phải,... theo chỉ dẫn. {"\n\n"}Chú ý: tăng âm lượng để nghe rõ chỉ dẫn</Text> */}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextbutton}  onPress = {() => {
            global.result_muster_class = this.state.Musterclass;
            global.result_muster_date = this.state.date;
            NavigationUtil.navigate("ResultMusterScreen");
            console.log(this.state)}}>
            <Text style={[styles.buttontext, {fontSize: 22}]}>Xem kết quả</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      // flex: .9,
    },
    footer: {
      flex: .1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nextbutton: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3D88EC',
    },

    uploadButton: {
      flex: 0.3,
      width: '70%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3D88EC',
      borderRadius: 5,
    },

    buttontext: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },

    logo: {
      width:150, 
      height:150, 
      alignSelf: 'center', 
      marginBottom: 150,
      marginTop: 50,
      zIndex: 0,
    },

    textinputlabel: {
      color: '#9098A9',
    },

    textinputlabel_focused: {
      color: '#3D88EC',
    },

    input: {
      height:40,
      marginBottom: 10,
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#C8CCD4',
    },

    input_focused: {
      height:40,
      marginBottom: 10,
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#3D88EC',
    },

    laser: {
      position: 'absolute',
      backgroundColor: 'red',
      height: 7,
      width: 150,
      opacity: 0.5,
      zIndex: 1,
    },
    instructionText: {
      fontSize: 22,
      color: 'white',
      marginBottom: 30,
    },

    captureButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'red',
      borderColor: 'white',
      borderWidth: 5,
    },

    stopCaptureButton: {
      width: 80,
      height: 80,
      borderRadius: 10,
      backgroundColor: 'red',
      borderColor: 'white',
      borderWidth: 5,
    },

    preview: {
      // height: winWidth * 2,
      // width: winWidth,
      backgroundColor: '#294c73',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },

    camera: {
      // height: winWidth * 4/3,
      width: width,
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });

