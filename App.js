import React, { useState } from "react";

import WelcomeScreen from "./app/screens/Welcome.screen";
import ViewImageScreen from "./app/screens/ViewImage.screen";
import ListingDetailsScreen from "./app/screens/ListingDetails.screen";
import HomeScreen from "./app/screens/Home.screen";
import MessagesScreen from "./app/screens/Messages.screen";
import AccountScreen from "./app/screens/Account.screen";
import SafeScreen from "./app/components/SafeScreen.component";
import Input from "./app/components/Input.component";
import colors from "./app/config/colors";
import { Switch } from "react-native";
import Picker from "./app/components/Picker.component";

const categories = [
  { label: "Furniture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Cameras", value: 3 },
];

export default function App() {
  const [isNew, setIsNew] = useState(false);
  const [category, setCategory] = useState(categories[0]);

  return (
    <SafeScreen>
      <Picker
        selectedItem={category}
        onSelectItem={(item) => setCategory(item)}
        placeholder="category"
        icon="apps"
        items={categories}
      />
      <Input placeholder="Full Name" icon="email" />
      <Switch value={isNew} onValueChange={(newValue) => setIsNew(newValue)} />
    </SafeScreen>
  );
}
