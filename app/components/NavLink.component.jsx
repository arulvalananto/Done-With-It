import React from "react";
import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";

import colors from "../config/colors";

const NavLink = ({ to, children }) => {
  const navigation = useNavigation();

  const handleNavigate = () => navigation.navigate(to);

  return (
    <Text style={styles.link} onPress={handleNavigate}>
      {children}
    </Text>
  );
};

export default NavLink;

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
    color: colors.primary,
  },
});
