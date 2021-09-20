import React from "react";
import { useFormikContext } from "formik";

import Input from "../Input.component";
import FormError from "./FormError.component";

const FormField = ({ name, width, icon, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <Input
        onChangeText={handleChange(name)}
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
