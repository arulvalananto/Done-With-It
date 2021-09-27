import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import jwtDecode from "jwt-decode";
import * as Yup from "yup";

import { Form, FormField, SubmitButton, FormError } from "../components/forms";
import SafeScreen from "../components/SafeScreen.component";
import { useStateValue } from "../auth/context";
import authApi from "../api/auth";
import { actionTypes } from "../auth/reducer";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const Login = () => {
  const [submitError, setSubmitError] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [state, dispatch] = useStateValue();

  const handleSubmit = async (values) => {
    const result = await authApi.login(values);

    if (!result.ok) {
      setSubmitError("Invalid email and/or password");
      setLoginFailed(true);
      return;
    }
    setLoginFailed(false);
    const user = jwtDecode(result.data);
    dispatch({
      type: actionTypes.FETCH_USER,
      user,
    });
    authStorage.storeToken(result.data);
  };

  return (
    <SafeScreen style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
      </View>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormError message={submitError} visible={loginFailed} />
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
