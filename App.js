import React, { useEffect, useState } from "react";
import { Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import WelcomeScreen from "./app/screens/Welcome.screen";
import ViewImageScreen from "./app/screens/ViewImage.screen";
import ListingDetailsScreen from "./app/screens/ListingDetails.screen";
import HomeScreen from "./app/screens/Home.screen";
import MessagesScreen from "./app/screens/Messages.screen";
import AccountScreen from "./app/screens/Account.screen";
import LoginScreen from "./app/screens/Login.screen";
import ListingEditScreen from "./app/screens/ListingEdit.screen";
import RegisterScreen from "./app/screens/Register.screen";
import SafeScreen from "./app/components/SafeScreen.component";
import ImageInputList from "./app/components/ImageInputList.component";

export default function App() {
  return <ListingEditScreen />;
}
