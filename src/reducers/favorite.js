// action type import
import { SAVE_FAVORITES, SAVE_FAVORITES_IDS } from "../actions";

export const initialState = {
  favorites: [],
  favoriteIds: [],
};

const favoriteReducer = (state = initialState, action = {}) => {
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

export default favoriteReducer;
