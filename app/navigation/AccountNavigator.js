import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screens/Account.screen";
import MessagesScreen from "../screens/Messages.screen";
import MyFeedsScreen from "../screens/MyFeeds.screen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="My Feeds" component={MyFeedsScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
