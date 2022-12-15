/* eslint-disable no-underscore-dangle */

// createStore appear as deprecated because Redux Toolkit is our recommended approach for writing Redux logic today.
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";

import debug from "../middlewares/debug";
import user from "../middlewares/user";
import brewery from "../middlewares/brewery";
import category from "../middlewares/category";
import event from "../middlewares/event";

export const middlewares = applyMiddleware(
  debug,
  brewery,
  category,
  user,
  event
);

// __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ is use to authorize redux devtools to be used
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(middlewares);

const store = createStore(reducer, enhancers);

export default store;
