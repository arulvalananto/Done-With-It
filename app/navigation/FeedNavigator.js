import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FeedsScreen from "../screens/Feeds.screen";
import FeedDetailsScreen from "../screens/FeedDetails.screen";

const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FeedsList" component={FeedsScreen} />
    <Stack.Screen name="FeedDetails" component={FeedDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
