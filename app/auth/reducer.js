export const initialState = {
  user: null,
};

export const actionTypes = {
  FETCH_USER: "FETCH_USER",
  REMOVE_USER: "REMOVE_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return { ...state, user: action.payload };
    case actionTypes.REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default reducer;
