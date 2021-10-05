import React from "react";
import * as Yup from "yup";
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import {
  FormImagePicker,
  Form,
  FormField,
  FormPicker,
  SubmitButton,
  FormError,
} from "../components/forms";
import SafeScreen from "../components/SafeScreen.component";
import CategoryPickerItem from "../components/CategoryPickerItem.component";
import useAPI from "../hooks/useAPI";
import requestApi from "../api/requests";
import categories from "../data/categories";
import useLocation from "../hooks/useLocation";
import Loading from "../components/Loading.component";
import Text from "../components/Text.component";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image"),
});

const FeedAdd = () => {
  const { data, loading, error, request: addFeed } = useAPI(requestApi.addFeed);

  const location = useLocation();
  const navigation = useNavigation();

  const handleSubmit = async (values, { resetForm }) => {
    console.log(location);
    await addFeed({ ...values, location });
    navigation.navigate("Feeds");
    resetForm(); // it's inside formikBAG on OnSubmit function
  };
  if (loading) {
    return <Loading visible={loading} />;
  }

  return (
    <SafeScreen style={styles.container}>
      <Text style={styles.header}>Add New Feed</Text>
      <Image />
      <FormError message={error} />
      <ScrollView>
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
          <FormPicker
            items={categories}
            name="category"
            numberOfColumns={3}
            placeholder="Category"
            PickerItemComponent={CategoryPickerItem}
            width="50%"
            style={styles.picker}
          />
          <FormImagePicker name="images" />
          <FormField
            style={styles.description}
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
      </ScrollView>
    </SafeScreen>
  );
};

export default FeedAdd;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 20,
  },
  picker: {
    marginRight: 10,
  },
  description: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
