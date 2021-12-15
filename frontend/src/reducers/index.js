import authReducer from './auth.reducers';
import userReducer from './auth.reducers'


import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    auth : authReducer,
    user : userReducer
});

export default rootReducer;
