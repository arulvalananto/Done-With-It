import React from "react";
import { StyleSheet, View } from "react-native";

export default function Flex() {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={{ backgroundColor: "orange", flex: 2 }} />
      <View style={{ backgroundColor: "dodgerblue", flex: 1 }} />
      <View style={{ backgroundColor: "forestgreen", flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({});
