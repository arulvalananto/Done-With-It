import React from "react";
import { useFormikContext } from "formik";

import Input from "../Input.component";
import FormError from "./FormError.component";

const FormField = ({ name, width, icon, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <Input
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        icon={icon}
        width={width}
        {...otherProps}
      />
      <FormError visible={touched[name]} message={errors[name]} />
    </>
  );
};

export default FormField;
