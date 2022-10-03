import { combineReducers } from 'redux';

import userReducer from './user';
import openmenuReducer from './openmenu';

const rootReducer = combineReducers({
    user: userReducer,
    openmenu: openmenuReducer,
});

export default rootReducer;