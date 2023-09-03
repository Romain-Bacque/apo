import { combineReducers } from "redux";

import userReducer from "./user";
import breweryReducer from "./brewery";
import favoriteReducer from "./favorite";
import eventReducer from "./event";
import categoryReducer from "./category";
import searchReducer from "./search";
import loadingReducer from "./loading";

const rootReducer = combineReducers({
  user: userReducer,
  brewery: breweryReducer,
  favorite: favoriteReducer,
  event: eventReducer,
  category: categoryReducer,
  search: searchReducer,
  loading: loadingReducer,
});

export default rootReducer;
