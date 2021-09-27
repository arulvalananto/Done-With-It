import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { useRoute } from "@react-navigation/core";

import CustomText from "../components/Text.component";
import ListItem from "../components/lists/ListItem.component";
import colors from "../config/colors";

const ListingDetails = () => {
  const {
    params: { title, price, image },
  } = useRoute();

  return (
    <>
      <Image
        style={styles.image}
        uri={image}
        preview={{ uri: image }} // you can use thumbnail here with minimum size
        tint="light"
      />
      <View style={styles.detailsContainer}>
        <CustomText style={styles.title}>{title}</CustomText>
        <CustomText style={styles.subTitle}>${price}</CustomText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Valan Anto"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </>
  );
};

export default ListingDetails;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  userContainer: {
    marginTop: 15,
  },
});
