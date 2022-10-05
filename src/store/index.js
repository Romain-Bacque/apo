/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from "../reducers";

import debug from '../middlewares/debug';
import user from '../middlewares/user';
import search from '../middlewares/search'
import data from '../middlewares/data'


const middlewares = applyMiddleware(data, debug, user, search);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(middlewares);

const store = createStore(reducer, enhancers);

export default store;
