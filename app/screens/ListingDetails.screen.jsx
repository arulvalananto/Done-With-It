import React from "react";
import { Image, StyleSheet, View } from "react-native";

import CustomText from "../components/Text.component";
import ListItem from "../components/lists/ListItem.component";
import colors from "../config/colors";

const ListingDetails = () => {
  return (
    <View>
      <Image style={styles.image} source={require("../assets/jacket.jpg")} />
      <View style={styles.detailsContainer}>
        <CustomText style={styles.title}>Red jacket for sale</CustomText>
        <CustomText style={styles.subTitle}>$100</CustomText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Valan Anto"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </View>
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
