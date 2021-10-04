import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import * as Yup from "yup";

import {
  Form,
  FormPicker as Picker,
  FormField,
  SubmitButton,
  FormImagePicker as ImagePicker,
} from "../components/forms";
import SafeScreen from "../components/SafeScreen.component";
import CategoryPickerItem from "../components/CategoryPickerItem.component";
import useLocation from "../hooks/useLocation";
import categories from "../data/categories";
import requestApi from "../api/requests";
import useAPI from "../hooks/useAPI";
import FormError from "../components/forms/FormError.component";
import Loading from "../components/Loading.component";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image"),
});

const ListingEdit = () => {
  const location = useLocation();
  const navigation = useNavigation();

  const { data, loading, error, request: addFeed } = useAPI(requestApi.addFeed);

  const handleSubmit = async (values, { resetForm }) => {
    await addFeed(values);

    navigation.navigate("Feed");

    resetForm(); // it's inside formikBAG on OnSubmit function
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeScreen style={styles.container}>
      <FormError message={error} />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          maxLength={255}
          name="title"
          placeholder="Title"
          returnKeyType="next"
          returnKeyLabel="next"
        />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
          returnKeyType="next"
          returnKeyLabel="next"
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          placeholder="Category"
          PickerItemComponent={CategoryPickerItem}
          width="50%"
          style={styles.picker}
        />
        <ImagePicker name="images" />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
          returnKeyType="next"
          returnKeyLabel="next"
        />
        <SubmitButton title="Post" />
      </Form>
    </SafeScreen>
  );
};

export default ListingEdit;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  picker: {
    marginRight: 10,
  },
});
