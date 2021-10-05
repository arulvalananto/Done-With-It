import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import { useRoute } from "@react-navigation/core";
import MapView, { Marker } from "react-native-maps";

import Text from "../components/Text.component";
import ListItem from "../components/lists/ListItem.component";
import colors from "../config/colors";

const prefix = "http://192.168.1.5:5000/uploads/";

const FeedDetails = () => {
  const {
    params: {
      title,
      price,
      description,
      category,
      createdBy,
      images,
      location,
    },
  } = useRoute();

  const [showMore, setShowMore] = useState(false);

  return (
    <ScrollView>
      <Image
        style={styles.image}
        uri={prefix + images[0]}
        preview={{ uri: prefix + images[0] }} // you can use thumbnail here with minimum size
        tint="light"
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>I want this!</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subTitle}>${price}</Text>
      <Text style={styles.description} numberOfLines={showMore ? 99 : 2}>
        {description}
      </Text>
      <TouchableOpacity
        onPress={() => setShowMore(!showMore)}
        style={styles.showMoreButton}
      >
        <Text style={styles.showMore}>{showMore ? "less" : "more"}</Text>
      </TouchableOpacity>
      <View style={styles.sellBy}>
        <Text style={styles.sellByLabel}>Sell By</Text>
        <Text style={styles.sellByName}>{createdBy.fullName}</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: +location.latitude,
          longitude: +location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: +location.latitude,
            longitude: +location.longitude,
          }}
          title={title}
          description={`price`}
        />
      </MapView>
    </ScrollView>
  );
};

export default FeedDetails;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
  },
  subTitle: {
    color: "#FFB81C",
    marginTop: 10,
    fontWeight: "700",
    fontSize: 24,
    paddingHorizontal: 20,
  },
  description: {
    color: colors.medium,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  showMoreButton: {
    marginBottom: 20,
  },
  showMore: {
    color: colors.primary,
    fontWeight: "700",
    paddingHorizontal: 20,
  },
  map: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  sellBy: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sellByLabel: {
    textTransform: "uppercase",
    fontSize: 14,
    color: "#a4a4a4",
  },
  sellByName: {
    fontWeight: "700",
  },
});
