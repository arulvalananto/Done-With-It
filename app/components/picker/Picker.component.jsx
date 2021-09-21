import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../../config/styles";
import PickerItem from "./PickerItem.component";
import Text from "../Text.component";
import SafeScreen from "../SafeScreen.component";
import Button from "../Button.component";

const Picker = ({
  icon,
  iconSize = 20,
  iconColor = defaultStyles.colors.medium,
  items,
  numberOfColumns = 1,
  onSelectItem,
  placeholder,
  PickerItemComponent = PickerItem,
  selectedItem,
  width = "100%",
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
        <View style={[styles.container, { width }, style]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={iconSize}
              color={iconColor}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={iconColor}
            style={styles.icon}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={isOpen} animationType="slide">
        <SafeScreen>
          <Button secondary onPress={() => setIsOpen(!isOpen)}>
            Close
          </Button>
          <FlatList
            data={items}
            keyExtractor={(items) => items.label}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setIsOpen(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </SafeScreen>
      </Modal>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 15,
  },
  text: {
    flex: 1,
    textTransform: "capitalize",
    fontWeight: "bold",
    color: defaultStyles.colors.dark,
  },
  placeholder: {
    flex: 1,
    color: defaultStyles.colors.medium,
  },
});
