import React, { useContext } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import { Entypo } from "@expo/vector-icons";

const ShowScreen = ({ navigation, route }) => {
  const { state } = useContext(BlogContext);
  console.log(route.params.id + " - " + navigation);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit", { id: route.params.id })}
          >
            <Entypo name="edit" size={30} />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  const blogPost = state.find((blogPost) => blogPost.id === route.params.id);
  return (
    <>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </>
  );
};

const styles = StyleSheet.create({});

export default ShowScreen;
