/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";

import user from "../middlewares/user";
import brewery from "../middlewares/brewery";
import category from "../middlewares/category";
import event from "../middlewares/event";

const middlewares = applyMiddleware(brewery, category, user, event);

// __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ is use to authorize redux devtools to be used
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(middlewares);

const store = createStore(reducer, enhancers);

export default store;
