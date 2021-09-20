import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CustomText from "../CustomText.component";
import SafeScreen from "../SafeScreen.component";
import PicketItem from "./PickerItem.component";
import defaultStyles from "../../config/styles";

const Picker = ({
  icon,
  placeholder,
  iconSize = 20,
  iconColor = defaultStyles.colors.medium,
  items,
  selectedItem,
  onSelectItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={iconSize}
              color={iconColor}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <CustomText style={styles.text}>{selectedItem.label}</CustomText>
          ) : (
            <CustomText style={styles.placeholder}>{placeholder}</CustomText>
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
          <Button title="Close" onPress={() => setIsOpen(!isOpen)} />
          <FlatList
            data={items}
            keyExtractor={(items) => items.label}
            renderItem={({ item }) => (
              <PicketItem
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
    width: "100%",
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
