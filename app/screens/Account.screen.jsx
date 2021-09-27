import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { ListItem, ListItemSeparator } from "../components/lists";
import SafeScreen from "../components/SafeScreen.component";
import Icon from "../components/Icon.component";
import colors from "../config/colors";
import { useStateValue } from "../auth/context";
import { actionTypes } from "../auth/reducer";
import authStorage from "../auth/storage";
import menuItems from "../data/menuItems";

const Account = () => {
  const navigation = useNavigation();
  const [{ user }, dispatch] = useStateValue();

  const handleLogout = () => {
    dispatch({ type: actionTypes.REMOVE_USER });
    authStorage.removeToken();
  };

  return (
    <SafeScreen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user ? user.name : "Valan Anto (Testing)"}
          subTitle={user ? user.email : "arulvalananto@github.io (Testing)"}
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
