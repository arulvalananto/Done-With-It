import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";

import { ListItem, ListItemSeparator } from "../components/lists";
import SafeScreen from "../components/SafeScreen.component";
import Icon from "../components/Icon.component";
import colors from "../config/colors";
import storage from "../utility/storage";
import menuItems from "../data/menuItems";
import { userRemoved } from "../redux/reducers/user.reducer";
import cache from "../utility/cache";

const Account = () => {
  const navigation = useNavigation();

  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(userRemoved());
      await storage.removeToken();
      await cache.remove();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SafeScreen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user?.fullName}
          subTitle={user?.email}
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItems) => menuItems.title}
          renderItem={({ item: { title, icon, targetScreen } }) => (
            <ListItem
              title={title}
              IconComponent={
                <Icon name={icon.name} backgroundColor={icon.backgroundColor} />
              }
              onPress={() => navigation.navigate(targetScreen)}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogout}
      />
    </SafeScreen>
  );
};

export default Account;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 10,
  },
});
