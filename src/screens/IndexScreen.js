import React, { useContext, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context as BlogContext } from "../context/BlogContext"; // Making this component access the infromation coming from the BlogContext
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);

  useEffect(() => {
    // Evrytime we show a screen, do a fetch
    getBlogPosts();
    console.log({ navigation });
    // Everytime we return from another screen, this will execute the body
    const listener = navigation.addListener("focus", () => {
      getBlogPosts();
    });

    // The returned function below will be invoked only when the instance of this screen is not on a stack
    return () => {
      listener.remove();
    };
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate("Create")}>
            <Feather name="plus" size={30} />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  return (
    <>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

// whener the IndexScreen is about to be displayed by react navigation, react navigation will automatically call the navigationOptions defined
// below coming from the created indexScreen component, this will inspect the object we are returning. The returned object can be used to
// customize the different things that are displayed inside the header(Including adding clickable components).
IndexScreen.navigationOptions = () => {
  return {
    headerRight: <Feather name="plus" size={30} />, // I can assign
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
