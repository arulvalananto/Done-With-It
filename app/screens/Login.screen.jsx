import React from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import SafeScreen from "../components/SafeScreen.component";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const Login = () => {
  return (
    <SafeScreen style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
      </View>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField
          name="email"
          icon="email"
          placeholder="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoFocus
        />
        <FormField
          name="password"
          icon="lock"
          placeholder="Password"
          textContentType="password"
          secureTextEntry
        />
        <SubmitButton title="Login" />
      </Form>
    </SafeScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 50,
  },
  logo: {
    width: 80,
    height: 80,
  },
});
