import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Card from "../components/Card.component";
import SafeScreen from "../components/SafeScreen.component";
import colors from "../config/colors";

const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 120,
    image: require("../assets/couch.jpg"),
  },
];

const Home = () => {
  return (
    <SafeScreen style={styles.container}>
      <FlatList
        data={listings}
        keyExtractor={(listings) => listings.id.toString()}
        renderItem={({ item: { title, price, image } }) => (
          <Card title={title} subTitle={"$" + price} image={image} />
        )}
      />
    </SafeScreen>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 20,
    paddingTop: 50,
  },
});
