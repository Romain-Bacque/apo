export const initialState = {
  value: "",
};

const searchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SEARCH_VALUE":
      return {
        ...state,
        value: action.value,
      };
    default:
      return state;
  }
};

export default searchReducer;
