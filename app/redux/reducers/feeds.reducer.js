const { createSlice } = require("@reduxjs/toolkit");

const feedsSlice = createSlice({
  name: "feeds",
  initialState: null,
  reducers: {
    feedsFetched: (feeds, action) => {
      return { ...feeds, ...action.payload };
    },
  },
});

export const { feedsFetched } = feedsSlice.actions;

export default feedsSlice.reducer;
