import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  AsyncStorage,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl
} from "react-native";
import { CheckBox } from 'react-native-elements'
import { showMessages } from "../components/Alert";
import ABBankHeader from "../components/ABBankHeader";
import i18n from "ex-react-native-i18n";
import Mockup from "../constants/Mockup";
import NavigationUtil from "../navigation/NavigationUtil";
import Block from "../components/Block";
import * as Icon from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import * as theme from "../constants/Theme";
import { Header } from 'react-native-elements';
import { StackActions, NavigationActions } from "react-navigation";
import { getListStudents, sendResult } from "../constants/Api";
import reactotron from "reactotron-react-native";
import I18n from "../i18n/i18n";
import Loading from "../components/Loading";

var my_check = []
const mockData = Mockup;
export default class ResultMusterScreen extends Component {
  constructor(props) {
    super(props);
    let data = this.props.navigation.getParam("data", "");
    this.state = {
      content: [],
      isLoading: true,
      refreshing: true,
      checked : []
    };
  }
  GetItem (name) {
    Alert.alert(name);
   }   
   FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  
//   renderSeparator = () => {
//     return <Divider style={{ marginHorizontal: 8 }} />;
//   };
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
      <View style={styles.MainContainer}>
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.content}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => 
        
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
              <Image source = {{ uri:'data:image/jpeg;base64,'+ item.uri }} style={styles.imageViewContainer} />
              <View style={{width:'55%', flexDirection: 'column', flex:1}}>
              <CheckBox
                title= {this.state.checked[index] ? "True" : 'False'} 
                checked={this.state.checked[index]}
                onPress={(checked) => {
                this.setState({ checked: !this.state.checked[index] });
                console.log(this.state.checked[index])  
                if(my_check[index] == false){
                  my_check[index] = true
                  this.setState({
                                 checked:my_check
                                 })
                 }else{
                 my_check[index] = false
                 this.setState({
                 checked:my_check// has to do this because  we cant change the single element in the array
                               })
                      }
                 console.log(this.state.checked)}}
              />
              <Text onPress={this.GetItem.bind(this, item.name)} style={styles.textViewContainer} >{item.name}</Text>
              </View>
              {/* <Text onPress={this.GetItem.bind(this, item.name)} style={styles.textViewContainer} >{item.name}</Text> */}
            </View>
        
          }
            refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData} />
          }
        />
        {/* <View style={styles.footer}>
            <TouchableOpacity style={styles.nextbutton}>
                <Text style={[styles.buttontext, {fontSize: 22}]}>REPORT</Text>
            </TouchableOpacity>
        </View>  */}
      </View> 
      <View style={styles.footer} >
            <TouchableOpacity style={styles.nextbutton}  onPress = {() => this.send_result()}>
                <Text style={[styles.buttontext, {fontSize: 22}]}>Xác nhận</Text>
            </TouchableOpacity>
        </View> 
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
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
        // leftComponent={{ icon: 'home', color: '#fff' }}
        centerComponent={<Text style={[theme.fonts.bold20, { color: "#fff" }]}>Kết quả điểm danh</Text>}
        // rightComponent={{ icon: 'home', color: '#fff' }}
      />
        {this.renderBody()}
      </View>
    );
  }
  send_result = async () => {
    console.log(my_check)
    let payload = {
      check : my_check 
    };
    try{
      console.log(1)
      await sendResult(payload);
      showMessages("", "Xác nhận thành công", async () => {
        // await AsyncStorage.setItem("content", this.state.content);
        // this.props.navigation.dispatch(resetAction);
        NavigationUtil.navigate("MainScreen");
      });
    }
    catch(err){
      showMessages("Lỗi server", "Xác nhận không thành công", async () => {
        NavigationUtil.navigate("MainScreen");
        // await AsyncStorage.setItem("content", this.state.content);
        // this.props.navigation.dispatch(resetAction);
      });
    }
  }
  getData = async () => {
    this.setState({ refreshing: true });
    let payload = {
      class_id: global.result_muster_class,
      date: global.result_muster_date
    };
    try {
      response = await getListStudents(payload);
      // console.log(response.content)
      this.setState({
        content: response.content,
        isLoading: false,
        refreshing: false
      });
    folder =this.state.content
    // console.log(this.state.content)
    my_check = []
    folder.forEach(() => {
      console.log(1)
      my_check.push(false)
    })
    this.setState({
      checked:my_check
    })
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
const styles = StyleSheet.create({

    MainContainer :{
    justifyContent: 'center',
    flex:1,
    // margin: 5,
    // paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    
    },
    screen: {
      flex: 1,
    },
    buttontext: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      nextbutton: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3D88EC',
      },
    footer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    imageViewContainer: {
    width: '45%',
    height: 130 ,
    margin: 10,
    // borderRadius : 10
    
    },
    screen: {
        flex: 1,
      },
    
    textViewContainer: {
        // width:'90%', 
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:20,
        // padding:10,
        fontWeight: 'bold',
        color: '#000'
    }
    
    });
    
