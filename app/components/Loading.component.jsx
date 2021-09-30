import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import colors from "../config/colors";

const Loading = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("../assets/animations/loader.json")}
        style={{ flex: 1, width: 400, height: 400 }}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.white,
    height: "100%",
    width: "100%",
    zIndex: 1,
    opacity: 0.8,
  },
});
