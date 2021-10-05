import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import PickerItem from "./PickerItem.component";
import Text from "../Text.component";
import SafeScreen from "../SafeScreen.component";
import Button from "../Button.component";
import Icon from "../Icon.component";

const Picker = ({
  icon,
  iconSize = 20,
  iconColor = colors.medium,
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
          <Button onPress={() => setIsOpen(!isOpen)} style={styles.close}>
            <Icon
              name="close"
              backgroundColor={colors.white}
              color={colors.black}
              style={styles.closeIcon}
              size={45}
            />
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
    backgroundColor: colors.light,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 15,
  },
  icon: {
    marginRight: 15,
  },
  text: {
    flex: 1,
    textTransform: "capitalize",
    fontWeight: "bold",
    color: colors.dark,
  },
  placeholder: {
    flex: 1,
    color: colors.medium,
  },
  close: {
    backgroundColor: colors.white,
  },
  closeIcon: {
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});
