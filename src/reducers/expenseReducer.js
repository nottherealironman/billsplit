import { FETCH_GROUP_EXPENSES_SUMMARY, /* FETCH_GROUP_EXPENSES_DETAILS */ } from '../actions/constants/action-types';

const initialState = {
    lists: {},
}

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCH_GROUP_EXPENSES_SUMMARY:
            return {
                ...state,
                lists: action.payload
            }
        
        /* case FETCH_GROUP_EXPENSES_DETAILS:
            currentState = state.lists;
            return {
                ...state,
                lists: [...currentState, action.payload]
            } */

        default:
            return state;
    }
}