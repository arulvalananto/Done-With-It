import React from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
} from "react-native";

import { useDeviceOrientation } from "@react-native-community/hooks";

export default function Dimension() {
  const { landscape } = useDeviceOrientation();
  console.log(Dimensions.get("screen"));

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "dodgerblue",
          width: "100%",
          height: landscape ? "100%" : "30%",
        }}
      ></View>
      {/* <View
        style={{ backgroundColor: "orange", width: "100%", height: "30%" }}
      ></View>
      <View
        style={{ backgroundColor: "orangered", width: "100%", height: "30%" }}
      ></View>
      <View
        style={{ backgroundColor: "green", width: "100%", height: "30%" }}
      ></View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
