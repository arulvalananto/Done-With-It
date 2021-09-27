import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import Text from "./Text.component";
import colors from "../config/colors";

const OfflineNotice = () => {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No internet connection</Text>
      </View>
    );

  return null;
};

export default OfflineNotice;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingTop: StatusBar.currentHeight,
    zIndex: 10,
    width: "100%",
  },
  text: {
    color: colors.white,
    paddingBottom: 10,
  },
});
