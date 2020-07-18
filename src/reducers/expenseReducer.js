import { FETCH_GROUP_EXPENSES_SUMMARY, FETCH_GROUP_EXPENSES_DETAILS } from '../actions/constants/action-types';

const initialState = {
    summary: {},
    details: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_GROUP_EXPENSES_SUMMARY:
            return {
                ...state,
                summary: action.payload
            }
        
        case FETCH_GROUP_EXPENSES_DETAILS:
            return {
                ...state,
                details:  action.payload
            }

        default:
            return state;
    }
}