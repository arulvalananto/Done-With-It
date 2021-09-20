import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import CustomButton from "../components/CustomButton.component";

const Welcome = () => {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
      blurRadius={2}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <Text style={styles.slogan}>Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton>Login</CustomButton>
        <CustomButton secondary>Sign Up</CustomButton>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  slogan: {
    paddingVertical: 20,
    fontWeight: "bold",
    fontSize: 25,
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
});
