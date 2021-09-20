import React, { useState } from "react";
import { FlatList } from "react-native";

import {
  ListItem,
  ListItemSeparator,
  ListItemDeleteAction,
} from "../components/lists";
import SafeScreen from "../components/SafeScreen.component";

const initialMessages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/mosh.jpg"),
  },
];

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (id) => {
    // Delete the message from messages array
    setMessages(messages.filter((m) => m.id !== id));
    // Call the server
  };

  return (
    <SafeScreen>
      <FlatList
        refreshing={refreshing}
        onRefresh={() =>
          setMessages([
            ...messages,
            {
              id: 3,
              title: "T3",
              description: "D3",
              image: require("../assets/mosh.jpg"),
            },
          ])
        }
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item: { title, description, image, id } }) => (
          <ListItem
            title={title}
            subTitle={description}
            image={image}
            onPress={() => console.log("Message selected")}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(id)} />
            )}
          />
        )}
        ItemSeparatorComponent={() => <ListItemSeparator />}
      />
    </SafeScreen>
  );
};

export default Messages;
