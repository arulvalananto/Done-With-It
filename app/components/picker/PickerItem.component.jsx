import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Text from "../Text.component";

const PicketItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
};

export default PicketItem;

const styles = StyleSheet.create({
  text: { padding: 20 },
});
