import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import colors from "../config/colors";

const ViewImage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={[styles.icon, styles.closeIcon]}></View>
        <View style={[styles.icon, styles.deleteIcon]}></View>
      </View>
      <Image
        source={require("../assets/chair.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default ViewImage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 30,
    width: "100%",
    paddingHorizontal: 25,
  },
  icon: {
    width: 50,
    height: 50,
  },
  closeIcon: {
    backgroundColor: colors.primary,
  },
  deleteIcon: {
    backgroundColor: colors.secondary,
  },
});
