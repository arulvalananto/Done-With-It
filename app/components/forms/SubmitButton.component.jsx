import React from "react";
import { useFormikContext } from "formik";

import CustomButton from "../CustomButton.component";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();

  return <CustomButton onPress={handleSubmit}>{title}</CustomButton>;
};

export default SubmitButton;
