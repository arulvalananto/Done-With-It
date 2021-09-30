import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
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
import UploadScreen from "./Upload.screen";
import requestApi from "../api/requests";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image"),
});

const ListingEdit = () => {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (values, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    const result = await requestApi.addFeed(
      { ...values, location },
      (progress) => setProgress(progress)
    );

    console.log(result);

    if (!result.ok) {
      setUploadVisible(false);
      return Alert.alert(result.problem, "Couldn't able to adding feed");
    }

    resetForm(); // it's inside formikBAG on OnSubmit fun
  };

  return (
    <SafeScreen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
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
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
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
