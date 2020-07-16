import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import groupReducer from '../reducers/groupReducer';
import memberReducer from '../reducers/memberReducer';
import billReducer from '../reducers/billReducer';

export default combineReducers({
    userInfo: userReducer,
    group: groupReducer,
    members: memberReducer,
    bills: billReducer
});