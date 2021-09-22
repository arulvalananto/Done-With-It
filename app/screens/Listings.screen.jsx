import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import Card from "../components/Card.component";
import SafeScreen from "../components/SafeScreen.component";
import colors from "../config/colors";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import Button from "../components/Button.component";
import Text from "../components/Text.component";
import Loading from "../components/Loading.component";
import useAPI from "../hooks/useAPI";

// const listings = [
//   {
//     id: 1,
//     title: "Red jacket for sale",
//     price: 100,
//     image: require("../assets/jacket.jpg"),
//   },
//   {
//     id: 2,
//     title: "Couch in great condition",
//     price: 120,
//     image: require("../assets/couch.jpg"),
//   },
// ];

const Home = () => {
  const navigation = useNavigation();

  const {
    data,
    error,
    loading,
    request: loadListings,
  } = useAPI(listingsApi.getListings);

  useEffect(() => {
    loadListings();
  }, []);

  if (loading) {
    return <Loading visible={loading} />;
  }

  return (
    <SafeScreen style={styles.container}>
      {error && (
        <>
          <Text style={styles.errorText}>Couldn't retrieve the listings.</Text>
          <Button onPress={loadListings}>Retry</Button>
        </>
      )}
      <FlatList
        data={data}
        keyExtractor={(data) => data.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            imageUrl={item.image[0].url}
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
  errorText: {
    textAlign: "center",
  },
});
