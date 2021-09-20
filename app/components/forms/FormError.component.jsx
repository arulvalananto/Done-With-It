import React from "react";
import { StyleSheet } from "react-native";
import Text from "../Text.component";

const FormError = ({ message, visible }) => {
  if (!visible || !message) return null;

  return <Text style={styles.error}>{message}</Text>;
};

export default FormError;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 14,
  },
});
