import React from "react";
import { useFormikContext } from "formik";

import Picker from "../picker/Picker.component";
import FormError from "./FormError.component";

function FormPicker({
  items,
  name,
  numberOfColumns,
  placeholder,
  PickerItemComponent,
  width,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <Picker
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
        PickerItemComponent={PickerItemComponent}
        numberOfColumns={numberOfColumns}
      />
      <FormError error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormPicker;
