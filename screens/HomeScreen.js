import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import ABBankHeader from "../components/ABBankHeader";
import * as theme from "../constants/Theme";
import i18n from "ex-react-native-i18n";
import SwiperFlatList from "react-native-swiper-flatlist";
import Mockup from "../constants/Mockup";
import Block from "../components/Block";
import * as Icon from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import reactotron from "reactotron-react-native";

const imgData = [
  "https://www.abbank.vn/Uploads/Originals/2019/7/3/1920x720-20190703083549.jpg",
  "https://www.abbank.vn/Uploads/Originals/2019/7/25/up-web_cv_dvcttg_1920x720-20190725130943.jpg",
  "https://www.abbank.vn/Uploads/Originals/2019/5/21/banner-web-uu-dai-mo-the-contactless-tang-vali-1920x720px-20190521113839.jpg",
  "https://www.abbank.vn/Uploads/Originals/2019/3/12/banner-web-sme-open1920x720-20190312134407.jpg",
  "https://www.abbank.vn/Uploads/Originals/2019/5/6/banner-web-1920x720px-20190506143524.jpg",
  "https://www.abbank.vn/Uploads/Originals/2018/10/3/1920x720_dv-thue-hai-quan-20181003140523.jpg"
];

const mockData = Mockup;
export default class HomeScreen extends Component {
  renderPromotion(item, i) {
    return (
      <Block card shadow style={{ marginLeft: 10, width: width / 2.5 }}>
        <Block>
          <TouchableOpacity>
            <Image
              source={{ uri: item.image }}
              style={{ width: width / 2.5, height: height / 5 }}
            />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Block row center style={{ marginTop: 5 }}>
            <Icon.FontAwesome
              name="calendar"
              size={16}
              color={theme.colors.gray}
            />
            <Text style={styles.time}>{item.time}</Text>
            <TouchableOpacity style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 12,
                  flex: 1,
                  textAlign: "right",
                  color: "#FB8C00"
                }}
              >
                Đọc thêm
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  }

  renderNew(item, i) {
    return (
      <TouchableOpacity>
        <Block
          row
          card
          shadow
          style={{ marginLeft: 10, marginVertical: 8, width: width }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: width / 3, height: 120 }}
          />
          <Block>
            <Text style={[styles.title, { marginHorizontal: 4 }]}>
              {item.title}
            </Text>
            <Text
              style={{ marginRight: 10, marginLeft: 8, marginTop: 5 }}
              numberOfLines={4}
            >
              {item.subContent}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
  renderSeparator = () => {
    return <Divider style={{ marginHorizontal: 8 }} />;
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ABBankHeader title={i18n.t("home")} />
        <ScrollView>
          <View style={[theme.styles.container]}>
            <SwiperFlatList
              autoplay
              autoplayDelay={3}
              autoplayLoop
              data={imgData}
              renderItem={({ item, index }) => (
                <Image
                  resizeMethod="scale"
                  source={{ uri: item }}
                  style={{ width: width, height: height / 4 }}
                />
              )}
            />

            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 10
              }}
            >
              Khuyến mãi
            </Text>
            <ScrollView
              style={{ marginTop: 10 }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              contentContainerStyle={{ padding: 5 }}
            >
              {mockData.listPromotion.map((item, i) =>
                this.renderPromotion(item, i)
              )}
            </ScrollView>

            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 10
              }}
            >
              Tin tức
            </Text>
            <FlatList
              data={mockData.listPromotionBusiness}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => this.renderNew(item, index)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#FB8C00",
    fontSize: 16
  },
  time: {
    color: theme.colors.gray,
    fontSize: 12,
    marginLeft: 4
  }
});
