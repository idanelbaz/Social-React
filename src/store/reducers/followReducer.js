import types from "../types";

export default function
  followReducer(state = { followersOfUser:null, userFollowOn:null }, action) {
  switch (action.type) {
    case types.GET_FOLLOWERS_OF_USER:
      return { ...state, followersOfUser: action.data };
    case types.GET_USER_FOLLOWE_ON:
      return { ...state, userFollowOn: action.data };
    default:
      return state;
  }
}