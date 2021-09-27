import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import OfflineNotice from "./app/components/OfflineNotice.component";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import reducer, { actionTypes, initialState } from "./app/auth/reducer";
import { StateProvider, useStateValue } from "./app/auth/context";
import authStorage from "./app/auth/storage";

export default function App() {
  const [state, dispatch] = useStateValue();
  const [isReady, setIsReady] = useState(FontFaceSetLoadEvent);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) dispatch({ type: actionTypes.FETCH_USER, user });
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <OfflineNotice />
      <NavigationContainer theme={NavigationTheme}>
        {state.user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </StateProvider>
  );
}

// NetInfo.fetch().then((netInfo) => console.log(netInfo)); // it's called once.
// Forever
// const unsubscribe = NetInfo.addEventListener((netInfo) =>
//   console.log(netInfo)
// );
