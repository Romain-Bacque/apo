// action type import
import { SAVE_BREWERIES, SAVE_BREWERY_DETAILS } from "../actions";

export const initialState = {
  breweries: [],
  breweryDetails: null,
};

const breweryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_BREWERIES:
      return {
        ...state,
        breweries: action.breweries,
      };
    case SAVE_BREWERY_DETAILS:
      return {
        ...state,
        breweryDetails: action.breweryDetails,
      };
    default:
      return state;
  }
};

export default breweryReducer;
