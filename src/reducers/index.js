import { combineReducers } from 'redux';

import userReducer from './user';
import dataReducer from './data';
import searchReducer from './search';
import snackbarReducer from './snackbar';

const rootReducer = combineReducers({
    user: userReducer,
    data : dataReducer,
    search : searchReducer,
    snackbar: snackbarReducer
});

export default rootReducer;