import React from "react";
import { StyleSheet } from "react-native";
import CustomText from "../CustomText.component";

const FormError = ({ message, visible }) => {
  if (!visible || !message) return null;

  return <CustomText style={styles.error}>{message}</CustomText>;
};

export default FormError;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 14,
  },
});
