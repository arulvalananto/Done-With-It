import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText.component";

const PicketItem = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CustomText style={styles.text}>{label}</CustomText>
    </TouchableOpacity>
  );
};

export default PicketItem;

const styles = StyleSheet.create({
  text: { padding: 20 },
});
