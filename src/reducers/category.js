export const initialState = {
  categories: [],
};

const breweryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SAVE_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
      };
    default:
      return state;
  }
};

export default breweryReducer;
