import React from "react";
import LottieView from "lottie-react-native";

const Loading = ({ visible }) => {
  if (!visible) return null;

  return (
    <LottieView
      source={require("../assets/animations/loader.json")}
      style={{ flex: 1, width: 400, height: 400 }}
    />
  );
};

export default Loading;
