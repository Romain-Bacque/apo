// action type import
import { SAVE_FAVORITES } from "../actions";

export const initialState = {
  favorites: [],
  favoriteIds: [],
};

const breweryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_FAVORITES:
      return {
        ...state,
        favorites: action.favorites,
      };
      case SAVE_FAVORITES_IDS:
        return {
          ...state,
          favoriteIds: action.favorites,
        };
    default:
      return state;
  }
};

export default breweryReducer;
