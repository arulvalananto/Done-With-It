import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Card from "../components/Card.component";
import SafeScreen from "../components/SafeScreen.component";
import colors from "../config/colors";
import routes from "../navigation/routes";

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
  const navigation = useNavigation();

  return (
    <SafeScreen style={styles.container}>
      <FlatList
        data={listings}
        keyExtractor={(listings) => listings.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={item.image}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
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
