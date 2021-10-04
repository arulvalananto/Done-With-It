import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button.component";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();

  return <Button onPress={handleSubmit}>{title}</Button>;
};

export default SubmitButton;
