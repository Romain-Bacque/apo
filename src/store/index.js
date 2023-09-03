/* eslint-disable no-underscore-dangle */

// createStore appear as deprecated because Redux Toolkit is our recommended approach for writing Redux logic today.
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";

import { debug, brewery, category, user, event } from "../middlewares";

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
