import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import userReducer from './userReducer';

const combinedReducer = combineReducers({
  postsReducer,
  userReducer,
})

export default combinedReducer
