import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";
import NavigationUtil from "../navigation/NavigationUtil";
import * as Icon from '@expo/vector-icons'
import * as theme from "../constants/Theme";

export default class BkzHeader extends Component {
  render() {
    const title = this.props.title;
    const detailOrder = this.props.detailOrder;
    const { back, add, menu, text, ...props } = this.props;

    return (
      <Header
        // placement="center"
        containerStyle={{
          backgroundColor: "#FFF"
        }}
        leftComponent={
            <Icon.Ionicons
                name="ios-arrow-round-back"
                size={35}
                color="#fff"
              />
            // <TouchableOpacity
            //   style={{
            //     height: "100%",
            //     flexDirection: "row",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     marginLeft: 5
            //   }}
            //   onPress={NavigationUtil.goBack}
            // >
            //   <Icon.Ionicons
            //     name="ios-arrow-round-back"
            //     size={35}
            //     color="#fff"
            //   />
            //   <Text
            //     style={[theme.fonts.bold20, { marginLeft: 15, color: theme.colors.black2 }]}
            //   >
            //     {title}
            //   </Text>
            // </TouchableOpacity>
        }
        centerComponent={
          // !back && (
          <Text style={[theme.fonts.bold20, { color: theme.colors.black2 }]}>{title}</Text>
          // )
        }
        rightComponent={
          <View>
            {add && (
              <TouchableOpacity
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10
                }}
                onPress={this.props.onPress}
              >
                <Icon.Ionicons
                  name={this.props.rightIconName}
                  size={35}
                  color="#fff"
                />
              </TouchableOpacity>
            )}
          </View>
        }
      />
    );
  }
}
