export const initialState = {
  breweries: [],
};

const breweryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SAVE_BREWERIES":
      return {
        ...state,
        breweries: action.breweries,
      };
    default:
      return state;
  }
};

export default breweryReducer;
