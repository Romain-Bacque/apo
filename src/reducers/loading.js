// action type import
import { ERROR, PENDING, SUCCESS } from "../actions";

export const initialState = {
  message: "",
  status: "pending",
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case PENDING:
      return { ...state, message: null, status: "pending" };
    case SUCCESS:
      return { ...state, message: action.message, status: "success" };
    case ERROR:
      return { ...state, message: action.message, status: "error" };
    default:
      return state;
  }
};

export default reducer;
