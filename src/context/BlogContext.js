import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "edit_blogpost ":
      console.log(action.payload);
      return state.map((blogPost) => {
        if (blogPost.id === action.payload.id) {
          console.log(action.payload);
          return action.payload;
        } else {
          return blogPost;
        }
      });
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    // case "add_blogpost":
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 99999),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callBack) => {
    await jsonServer.post("/blogposts", { title: title, content: content });

    // dispatch({
    //   type: "add_blogpost",
    //   payload: { title: title, content: content },
    // });
    // if (callBack) {
    //   callBack();
    // }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({
      type: "edit_blogpost",
      payload: { id: id, title: title, content: content },
    });
  };
};

// exported context helps for components access data
export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost,
    deleteBlogPost,
    editBlogPost,
    getBlogPosts,
  },
  []
);
