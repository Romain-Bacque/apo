/* eslint-disable no-underscore-dangle */

// createStore appear as deprecated because Redux Toolkit is our recommended approach for writing Redux logic today.
import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";

import debug from "../middlewares/debug";
import user from "../middlewares/user";
import brewery from "../middlewares/brewery";
import category from "../middlewares/category";
import event from "../middlewares/event";

export function createTestStore() {
  const middlewares = applyMiddleware(debug, brewery, category, user, event);

  const store = createStore(reducer, middlewares);

  return store;
}
