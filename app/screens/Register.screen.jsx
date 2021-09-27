import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import SafeScreen from "../components/SafeScreen.component";
import { Form, FormField, SubmitButton } from "../components/forms";
import usersApi from "../api/users";
import authApi from "../api/auth";
import FormError from "../components/forms/FormError.component";
import useAPI from "../hooks/useAPI";
import Loading from "../components/Loading.component";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().label("Full Name"),
  email: Yup.string().required().email().label("Email Address"),
  password: Yup.string().required().min(8).label("Password"),
});

const Register = () => {
  const [error, setError] = useState("");
  const registerApi = useAPI(usersApi.register);
  const loginApi = useAPI(authApi.login);

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occured.");
        console.log(result);
      }
      return;
    }
    const { data: authToken } = await loginApi.request(userInfo);
  };

  return (
    <>
      <Loading visible={registerApi.loading || loginApi.loading} />
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
          <SubmitButton title="Register" />
        </Form>
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
});
