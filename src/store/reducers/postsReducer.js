import types from "../types";

export default function
  postsReducer(state = { posts: [], userPost: null }, action) {
  switch (action.type) {
    case types.Get_POSTS:
      return { ...state, posts: action.data };
    case types.Get_POSTS_BY_USER:
      return { ...state, userPost: action.data };
    default:
      return state;
  }
}