import { ADD_MEMBER, FETCH_MEMBER_LIST, SEARCH_MEMBER, DELETE_MEMBER, RESET_MODAL_STATE } from '../actions/constants/action-types';

const initialState = {
    lists: {},
    searchList: {},
}

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_MEMBER_LIST:
            return {
                ...state,
                lists: action.payload
            }

        case SEARCH_MEMBER:
            return {
                ...state,
                searchList: action.payload
            }

        case RESET_MODAL_STATE:
            return {
                ...state,
                searchList: {}
            }

        case ADD_MEMBER:
            // Create an object of currently added member
            let newState = { _id:action.payload.user_id, name:action.payload.name, email: action.payload.email, members: new Array({user_id:action.payload.user_id, group_id:action.payload.group_id}) }; 
            // Store the states filter the current user from the list
            let states = state.searchList.filter(el => el._id !== action.payload.user_id);
            return {
                ...state,
                // Append the newly created state to previous state list
                searchList: [...states, newState]
            }

        case DELETE_MEMBER:
            return {
                ...state,
                // Delete the current group from state tree and return updated group list
                lists: state.lists.filter(el => el._id !== action.payload)
            }

        default:
            return state;
    }
}