import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useNetInfo } from "@react-native-community/netinfo";
import AppLoading from "expo-app-loading";

import OfflineNotice from "./app/components/OfflineNotice.component";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import cache from "./app/utility/cache";
import storage from "./app/utility/storage";
import { userFetched } from "./app/redux/reducers/user.reducer";
import requestApi from "./app/api/requests";

const AppWrapper = () => {
  const [isReady, setIsReady] = useState(false);

  const netInfo = useNetInfo();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialLoading = async () => {
    try {
      // check the app is offline
      // if it is offline
      if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
        // check cache is available and if it has
        const userData = await cache.get("/current-user");
        if (userData) {
          dispatch(userFetched(userData));
          return;
        }
      }
      // if it's not offline and token is not found.
      const token = await storage.getToken();
      if (!token) return;

      // if token is found.
      const result = await requestApi.getCurrentUser(token);
      if (!result.ok) return alert(result.data.message);

      const user = result.data.user;
      await cache.store("/current-user", user);
      dispatch(userFetched(user));
    } catch (err) {
      alert(err);
    }
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={initialLoading}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  console.log(state);

  return (
    <>
      <OfflineNotice />
      <NavigationContainer theme={NavigationTheme}>
        {state.user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
};

export default AppWrapper;
