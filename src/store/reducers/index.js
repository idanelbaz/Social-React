import { combineReducers } from 'redux';
import postsReducer from './postsReducer'
import userReducer from './userReducer'
import followReducer from './followReducer'



const combinedReducer = combineReducers({
    postsReducer,
    userReducer,
    followReducer
  })
  
  export default combinedReducer
  