import { ADD_GROUP, FETCH_GROUP_LIST, UPDATE_GROUP, DELETE_GROUP } from '../actions/constants/action-types';

const initialState = {
    lists: {}
}

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_GROUP_LIST:
            return {
                ...state,
                lists: action.payload
            }

        case ADD_GROUP:
            return {
                ...state,
                // Add new group to group list
                //lists: state.lists.concat(action.payload) // This method work as well
                lists: [...state.lists, action.payload]
            }

        case UPDATE_GROUP:
            // Delete currently updating group from state list
            let states = state.lists.filter(el => el._id !== action.payload._id); 
            return {
                ...state,
                // Append updated group to the state list
                lists: [...states, action.payload]
            }

        case DELETE_GROUP:
            return {
                ...state,
                // Delete the current group from state tree and return updated group list
                lists: state.lists.filter(el => el._id !== action.payload)
            }

        default:
            return state;
    }
}