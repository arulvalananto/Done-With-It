import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import SafeScreen from "../components/SafeScreen.component";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().label("Full Name"),
  email: Yup.string().required().email().label("Email Address"),
  password: Yup.string().required().min(8).label("Password"),
});

const Login = () => {
  return (
    <SafeScreen style={styles.container}>
      <Form
        initialValues={{ fullName: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField
          name="fullName"
          icon="account"
          placeholder="Full Name"
          textContentType="name"
          autoFocus
        />
        <FormField
          name="email"
          icon="email"
          placeholder="Email Address"
          textContentType="emailAddress"
          keyboardType="email-address"
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
    paddingTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
  },
});
