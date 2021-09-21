import React from "react";

const {
  createNativeStackNavigator,
} = require("@react-navigation/native-stack");

import WelcomeScreen from "../screens/Welcome.screen";
import LoginScreen from "../screens/Login.screen";
import RegisterScreen from "../screens/Register.screen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
