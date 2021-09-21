import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { ListItem, ListItemSeparator } from "../components/lists";
import SafeScreen from "../components/SafeScreen.component";
import Icon from "../components/Icon.component";
import colors from "../config/colors";
import routes from "../navigation/routes";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: { name: "email", backgroundColor: colors.secondary },
    targetScreen: routes.MESSAGES,
  },
];

const Account = () => {
  const navigation = useNavigation();

  return (
    <SafeScreen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Valan Anto"
          subTitle="arulvalananto@github.io"
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
