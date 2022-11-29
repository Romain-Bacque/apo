// action type import
import { SEARCH_VALUE } from "../actions";

export const initialState = {
  value: "",
};

const searchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_VALUE:
      return {
        ...state,
        value: action.value.toLowerCase().trim(),
      };
    default:
      return state;
  }
};

export default searchReducer;
