import React, { useEffect, useState } from "react";
import { Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WelcomeScreen from "./app/screens/Welcome.screen";
import LoginScreen from "./app/screens/Login.screen";
import RegisterScreen from "./app/screens/Register.screen";
import ViewImageScreen from "./app/screens/ViewImage.screen";
import ListingDetailsScreen from "./app/screens/ListingDetails.screen";
import HomeScreen from "./app/screens/Listings.screen";
import MessagesScreen from "./app/screens/Messages.screen";
import AccountScreen from "./app/screens/Account.screen";
import ListingEditScreen from "./app/screens/ListingEdit.screen";
import SafeScreen from "./app/components/SafeScreen.component";
import ImageInputList from "./app/components/ImageInputList.component";
import AuthNavigator from "./app/navigation/AuthNavigator";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

// const Stack = createNativeStackNavigator();
// const StackNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerStyle: { backgroundColor: "tomato" },
//           headerTintColor: "white",
//           headerShown: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// const Tab = createBottomTabNavigator();
// const TabNavigator = () => (
//   <Tab.Navigator
//     tabBarOptions={{
//       activeBackgroundColor: "tomato",
//       activeTintColor: "white",
//       inactiveBackgroundColor: "#eee",
//       inactiveTintColor: "black",
//     }}
//   >
//     <Tab.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//         tabBarIcon: ({ size, color }) => (
//           <MaterialCommunityIcons name="home" size={size} color={color} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Message"
//       component={MessagesScreen}
//       options={{
//         tabBarIcon: ({ size, color }) => (
//           <MaterialCommunityIcons name="message" size={size} color={color} />
//         ),
//       }}
//     />
//   </Tab.Navigator>
// );
