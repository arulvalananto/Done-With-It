import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const CustomText = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontSize: Platform.OS === "android" ? 18 : 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});
