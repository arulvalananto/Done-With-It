import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userFetched: (user, action) => {
      return action.payload;
    },
    userRemoved: (user, action) => {
      return null;
    },
    userFeedFetched: (user, action) => {
      return { ...user, feeds: [...feeds, action.payload] };
    },
  },
});

export const { userRemoved, userFetched, userFeedFetched } = userSlice.actions;

export default userSlice.reducer;

// Selector

const selectState = (state) => state;

export const selectUser = createSelector(selectState, (state) => state.user);
