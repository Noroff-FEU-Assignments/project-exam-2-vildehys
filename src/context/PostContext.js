import { createContext, useReducer, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../constants/Api";

import postReducer, { initialState } from "./UseReducer";

const PostContext = createContext(initialState);

const postUrl = BASE_URL + "posts";

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const [auth] = useContext(AuthContext);

  useEffect(() => {
    async function fetchPosts() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      try {
        const response = await fetch(postUrl, options);
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          setError("There was an error during the API request");
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchPosts();
  }, []);

  const setPosts = (posts) => {
    dispatch({
      type: "SET_POSTS",
      payload: posts,
    });
  };

  const setError = (error) => {
    dispatch({
      type: "SET_ERROR",
      payload: error,
    });
  };

  const setDetails = (details) => {
    dispatch({
      type: "POST_DETAILS",
      payload: details,
    });
  };

  const setComments = (comments) => {
    dispatch({
      type: "SET_COMMENTS",
      payload: comments,
    });
  };

  const addComment = (comment) => {
    dispatch({
      type: "ADD_COMMENT",
      payload: comment,
    });
  };

  const addPost = (post) => {
    dispatch({
      type: "ADD_POST",
      payload: post,
    });
  };

  const removePost = (postId) => {
    dispatch({
      type: "REMOVE_POST",
      payload: postId,
    });
  };

  return (
    <PostContext.Provider
      value={{
        state,
        setDetails,
        setComments,
        addComment,
        addPost,
        removePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const useStore = () => useContext(PostContext);

export default useStore;
