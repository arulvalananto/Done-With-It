import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import SafeScreen from "../components/SafeScreen.component";
import { Form, FormField, SubmitButton } from "../components/forms";
import FormError from "../components/forms/FormError.component";
import Loading from "../components/Loading.component";
import Text from "../components/Text.component";
import NavLink from "../components/NavLink.component";
import requestApi from "../api/requests";
import storage from "../utility/storage";
import cache from "../utility/cache";
import { userFetched } from "../redux/reducers/user.reducer";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().label("Full Name"),
  email: Yup.string().required().email().label("Email Address"),
  password: Yup.string().required().min(8).label("Password"),
});

const Register = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleSubmit = async (userInfo) => {
    try {
      // Send credentials to "/register" API
      const response = await requestApi.register(userInfo);
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
    <>
      <Loading visible={false} />
      <SafeScreen style={styles.container}>
        <FormError message={error} visible={error} />
        <Form
          initialValues={{ fullName: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            name="fullName"
            icon="account"
            placeholder="Full Name"
            textContentType="name"
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
          <SubmitButton title="Register" />
        </Form>
        <Text style={styles.navLink}>
          Already user? <NavLink to="Login">login</NavLink>
        </Text>
      </SafeScreen>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
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
