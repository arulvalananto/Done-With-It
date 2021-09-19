import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

const ViewImage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <MaterialCommunityIcons name="close" color="white" size={30} />
        <MaterialCommunityIcons
          name="trash-can-outline"
          color="white"
          size={30}
        />
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
});
