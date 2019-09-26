import I18n from "../i18n/i18n";
import React, { Component } from "react";
import { Alert } from "react-native";

export const showConfirm = (title, content, action) => {
  setTimeout(() => {
    Alert.alert(
      title,
      content,
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xác nhận",
          onPress: action
        }
      ],
      { cancelable: false }
    );
  }, 250);
};

export const showMessages = (title, content, action) => {
  setTimeout(() => {
    Alert.alert(
      title,
      content,
      [
        {
          text: "OK",
          onPress: action
        }
      ],
      { cancelable: false }
    );
  }, 250);
};
