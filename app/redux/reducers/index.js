import { combineReducers } from "@reduxjs/toolkit";

import feedsReducer from "./feeds.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  user: userReducer,
  feeds: feedsReducer,
});
