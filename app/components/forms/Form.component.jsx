import React from "react";
import { Formik } from "formik";

const Form = ({ initialValues, onSubmit, validationSchema, children }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => console.log(values)}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default Form;
