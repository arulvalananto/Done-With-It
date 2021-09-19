import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import colors from "../config/colors";
import CustomText from "./CustomText.component";

const Card = ({ title, price, image }) => {
  return (
    <View style={styles.card}>
      <Image
        source={image}
        style={styles.cardImage}
        resizeMode="cover"
        fadeDuration={1000}
      />
      <View style={styles.detailsContainer}>
        <CustomText style={styles.title}>{title}</CustomText>
        <CustomText style={styles.price}>{price}</CustomText>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});
