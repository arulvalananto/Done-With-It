import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Icon from "./Icon.component";
import Text from "./Text.component";

const CategoryPickerItem = ({ item, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={80}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
};

export default CategoryPickerItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 10,
    textAlign: "center",
  },
});
