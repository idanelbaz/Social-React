import types from "../types";

export default function
  usersReducer(state = {user:null}, action) {
  switch (action.type) {
    case types.GET_USER:
      return { ...state, user: action.data };
    default:
      return state;
  }
}