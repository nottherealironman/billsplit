import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import groupReducer from '../reducers/groupReducer';

export default combineReducers({
    userInfo: userReducer,
    group: groupReducer
});