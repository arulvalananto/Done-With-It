import React from "react";
import { useFormikContext } from "formik";

import { Picker } from "../picker";
import FormError from "./FormError.component";

function FormPicker({
  items,
  name,
  numberOfColumns,
  placeholder,
  PickerItemComponent,
  width,
  style,
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
        style={style}
      />
      <FormError error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormPicker;
