import { combineReducers } from 'redux';

import userReducer from './user';
import dataReducer from './data';
import searchReducer from './search';

const rootReducer = combineReducers({
    user: userReducer,
    data : dataReducer,
    search : searchReducer 
});

export default rootReducer;