import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./reducerPosts";

const rootReducer = combineReducers({
  posts: postsReducer
});

export default rootReducer;