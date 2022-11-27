import { combineReducers } from "redux";

import userReducer from "./user";
import breweryReducer from "./brewery";
import eventReducer from "./event";
import categoryReducer from "./category";
import searchReducer from "./search";
import loadingReducer from "./loading";

const rootReducer = combineReducers({
  user: userReducer,
  brewery: breweryReducer,
  event: eventReducer,
  category: categoryReducer,
  search: searchReducer,
  loading: loadingReducer,
});

export default rootReducer;
