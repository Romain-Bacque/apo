import { combineReducers } from "redux";

import userReducer from "./user";
import breweryReducer from "./brewery";
import categoryReducer from "./category";
import searchReducer from "./search";
import snackbarReducer from "./snackbar";

const rootReducer = combineReducers({
  user: userReducer,
  brewery: breweryReducer,
  category: categoryReducer,
  search: searchReducer,
  snackbar: snackbarReducer,
});

export default rootReducer;
