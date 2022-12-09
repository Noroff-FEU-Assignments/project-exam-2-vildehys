export const initialState = {
  posts: [],
  details: null,
  comments: [],
  loading: true,
  error: null,
};

const useReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_POST":
      return {
        ...state,
        posts: state.posts.push(payload),
      };

    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
      };

    case "ADD_COMMENT":
      return {
        ...state,
        comments: state.comments.push(payload),
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: payload,
        loading: false,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case "POST_DETAILS":
      return {
        ...state,
        details: payload,
      };

    case "SET_COMMENTS":
      return {
        ...state,
        comments: payload,
      };

    default:
      throw new Error(`Nothing found for ${type} in useReducer.`);
  }
};

export default useReducer;
