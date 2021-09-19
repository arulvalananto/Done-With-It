import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../components/Card.component";

const Home = () => {
  return (
    <View style={{ backgroundColor: "#f8f4f4", padding: 20, paddingTop: 100 }}>
      <Card
        title="Red jacket for sale"
        price="$100"
        image={require("../assets/jacket.jpg")}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
