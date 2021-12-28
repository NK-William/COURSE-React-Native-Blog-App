import React, { useContext } from "react";

import { StyleSheet } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen = ({ navigation }) => {
  //console.log(navigation);
  const { addBlogPost } = useContext(BlogContext);
  return (
    <BlogPostForm
      onSubmit={(title, content) => {
        addBlogPost(title, content, navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;
