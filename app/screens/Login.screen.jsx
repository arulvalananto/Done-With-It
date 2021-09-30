import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import FormError from "../components/forms/FormError.component";
import Text from "../components/Text.component";
import SafeScreen from "../components/SafeScreen.component";
import NavLink from "../components/NavLink.component";
import requestApi from "../api/requests";
import storage from "../utility/storage";
import cache from "../utility/cache";
import { userFetched } from "../redux/reducers/user.reducer";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      // Send credentials to "/login" API
      const response = await requestApi.login(values);
      if (!response.ok) return setError(response.data.message);

      // Store token into "Secure Storage"
      await storage.storeToken(response.data.token);

      // Send token to "/current-user" API
      const result = await requestApi.getCurrentUser(response.data.token);
      if (!result.ok) return setError(result.data.message);

      // cache user details into "Async Storage"
      await cache.store("/current-user", result.data.user);

      // store it into global state and it automatically redirects to user page
      dispatch(userFetched(result.data.user));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <SafeScreen style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
      </View>
      <FormError message={error} visible={error} />
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          name="email"
          icon="email"
          placeholder="Email"
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
      <Text style={styles.navLink}>
        New User? <NavLink to="Register">register</NavLink>
      </Text>
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
  navLink: {
    width: "100%",
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "600",
  },
});
