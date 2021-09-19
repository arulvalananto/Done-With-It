import React from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Button,
  Alert,
  StatusBar,
} from "react-native";

export default function App() {
  const handlePress = () => console.log("Text Pressed");

  return (
    <SafeAreaView style={styles.container}>
      <Text numberOfLines={1} onPress={handlePress}>
        Open up App.js to start working on your app!
      </Text>
      {/* <Image source={require("./assets/icon.png")} style={styles.logo} /> */}
      <TouchableWithoutFeedback onPress={() => console.log("Image Tapped")}>
        <Image
          source={{
            uri: "https://picsum.photos/200/300",
            width: 200,
            height: 300,
          }}
          // fadeDuration={1000}
          // blurRadius={10}
          // resizeMode="contain"
        />
      </TouchableWithoutFeedback>
      <Button
        color="orange"
        style={[styles.button, styles.primaryButton]}
        title="Click me"
        onPress={() =>
          // Alert.alert("Title", "Message", [
          //   { text: "Yes", onPress: () => console.log("yes") },
          //   { text: "No", onPress: () => console.log("No") },
          // ])
          Alert.prompt("Title", "Message", (text) => console.log(text))
        }
      />
    </SafeAreaView>
  );
}

const containerStyle = { backgroundColor: "orange" };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: 50,
    height: 50,
  },
});
