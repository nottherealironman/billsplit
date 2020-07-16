import { FETCH_BILL_LIST, ADD_BILL } from '../actions/constants/action-types';

const initialState = {
    lists: {},
}

export default function (state = initialState, action) {
    let currentState;
    switch (action.type) {

        case FETCH_BILL_LIST:
            return {
                ...state,
                lists: action.payload
            }
        
        case ADD_BILL:
            currentState = state.lists;
            return {
                ...state,
                lists: [...currentState, action.payload]
            }

        default:
            return state;
    }
}