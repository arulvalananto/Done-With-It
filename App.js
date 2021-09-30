import React from "react";
import { Provider } from "react-redux";

import store from "./app/redux/store";
import AppWrapper from "./AppWrapper.component";

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}
