import { ADD_MEMBER, FETCH_MEMBER_LIST, SEARCH_MEMBER, DELETE_MEMBER, RESET_MODAL_STATE } from '../actions/constants/action-types';

const initialState = {
    lists: {},
    searchList: {},
}

export default function (state = initialState, action) {
    let currentState;
    let updatedState = [];;
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
            /* Code for "lists" state -- START*/ 
            currentState = state.lists;
            updatedState = [];
            // Loop through the current state and add newly added member to the state
            Object.keys(currentState).map((key, val) => {
                if (currentState[key]._id === action.payload.group_id) {
                    let newUserInfo = [
                            ...currentState[key].user_info, 
                            { 
                                name: action.payload.name, 
                                _id: action.payload.user_id
                            }
                        ];
                    let newArr = { 
                        _id: currentState[key]._id, 
                        group_name: currentState[key].group_name, 
                        user_info: newUserInfo 
                    };
                    updatedState.push(newArr);
                }
                else {
                    updatedState.push(currentState[key]);
                }
            });
            /* Code for "lists" state -- END*/ 

            /* Code for "lisearchList" state -- START*/ 
            // Create an object of currently added member
            let newSearchState = { 
                _id: action.payload.user_id, 
                name: action.payload.name, 
                email: action.payload.email, 
                members: new Array({ 
                        user_id: action.payload.user_id, 
                        group_id: action.payload.group_id 
                    }) 
                };
            // Store the states filter the current user from the list
            let searchStates = state.searchList.filter(el => el._id !== action.payload.user_id);
            /* Code for "lisearchList" state -- END*/ 
            return {
                ...state,
                lists: updatedState,
                // Append the newly created state to current state list
                searchList: [...searchStates, newSearchState]
            }

        case DELETE_MEMBER:
            currentState = state.lists;
            // Delete the member from state tree whose group_id and user_id matches with member in the states
            Object.keys(currentState).map((key, val) => {
                if (currentState[key]._id === action.payload.group_id) {
                    // Only return users whose user_id does not match with deleted user
                    let newUserInfo = currentState[key].user_info.filter(el => el._id !== action.payload.user_id);
                    let newArr = { 
                        _id: currentState[key]._id, 
                        group_name: currentState[key].group_name, 
                        user_info: newUserInfo 
                    };
                    updatedState.push(newArr);
                }
                else {
                    updatedState.push(currentState[key]);
                }
            });
            return {
                ...state,
                lists: updatedState,
            }

        default:
            return state;
    }
}