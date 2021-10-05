import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import Card from "../components/Card.component";
import SafeScreen from "../components/SafeScreen.component";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Button from "../components/Button.component";
import Text from "../components/Text.component";
import Loading from "../components/Loading.component";
import useAPI from "../hooks/useAPI";
import requestApi from "../api/requests";
import { feedsFetched } from "../redux/reducers/feeds.reducer";

const prefix = "http://192.168.1.5:5000/uploads/";

const Home = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await updateFeeds();
    setRefreshing(false);
  };

  const {
    data,
    error,
    loading,
    request: loadFeeds,
  } = useAPI(requestApi.retrieveFeeds);

  const updateFeeds = async () => {
    await loadFeeds();
    dispatch(feedsFetched(data.feeds));
  };

  useEffect(() => {
    updateFeeds();
  }, []);

  if (loading) {
    return <Loading visible={loading} />;
  }

  return (
    <SafeScreen style={styles.container}>
      {error && (
        <>
          <Text style={styles.errorText}>Couldn't retrieve the feeds.</Text>
          <Button onPress={loadFeeds}>Retry</Button>
        </>
      )}
      {data?.feeds?.length ? (
        <FlatList
          data={data.feeds}
          keyExtractor={(data) => data._id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              imageUrl={prefix + item.images[0]}
              onPress={() => navigation.navigate(routes.FEED_DETAILS, item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <Text style={styles.noFeed}>No Feeds Available 😌</Text>
      )}
    </SafeScreen>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 20,
    paddingTop: 50,
  },
  errorText: {
    textAlign: "center",
  },
  noFeed: {
    color: colors.primary,
    fontWeight: "700",
    textAlign: "center",
  },
});
