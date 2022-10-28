export const initialState = {
  breweries: [],
  loading: true,
};

const breweryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SAVE_BREWERIES":
      return {
        ...state,
        breweries: action.breweries,
        loading: false,
      };
    default:
      return state;
  }
};

export default breweryReducer;
