import { FETCH_BILL_LIST, ADD_BILL, DELETE_BILL } from '../actions/constants/action-types';

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
        
        case DELETE_BILL:
            return{
                ...state,
                // Delete the bill from state tree and return updated group list
                lists: state.lists.filter(el => el._id !== action.payload)
            }

        default:
            return state;
    }
}