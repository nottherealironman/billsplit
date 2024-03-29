import { LOGIN, SIGNUP, FETCH_USER_INFO } from '../actions/constants/action-types';

const initialState = {
    info: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                info: action.payload
            }

        case LOGIN:
            return {
                ...state,
                info: action.payload
            }

        case FETCH_USER_INFO:
            return {
                ...state,
                info: action.payload
            }
            
        default:
            return state;
    }
}

