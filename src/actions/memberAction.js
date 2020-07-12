import { ADD_MEMBER, FETCH_MEMBER_LIST, SEARCH_MEMBER, DELETE_MEMBER, RESET_MODAL_STATE } from './constants/action-types';

// Method to fetch members from groups in which current user is a member
export const fetchMemberList = (token) => dispatch => {
    fetch('http://localhost:3001/v1/members',{
        method: 'GET',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
    })
    .then(res => res.json())
    .then(members =>
        dispatch({
            type: FETCH_MEMBER_LIST,
            payload: members
        }))
    .catch(error => {
        console.log('error while fetching members');
    })
}

// Method to search members while adding in a group
export const searchMember = (token, email, group_id) => dispatch => {
    fetch('http://localhost:3001/v1/members/search',{
        method: 'POST',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify({'email':email, 'group_id': group_id})
    })
    .then(res => res.json())
    .then(member =>{
        console.log(member);
        dispatch({
            type: SEARCH_MEMBER,
            payload: member
        });
    })
    .catch(error => {
        console.log('error while searching member');
    })
}

// Method to reset the state of modal
export const resetModalState = () => dispatch => {
    dispatch({
        type: RESET_MODAL_STATE
    });
}

// Method to add member in group
export const addMember = (token, member) => dispatch => {
    fetch('http://localhost:3001/v1/members',{
        method: 'POST',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify(member)
    })
    .then(res => res.json())
    .then(member =>{
        console.log(member);
        dispatch({
            type: ADD_MEMBER,
            payload: member
        });
    })
    .catch(error => {
        console.log('error while adding member');
    })
}

// Method to delete member from a group
export const deleteMember = (token, user_id, group_id) => dispatch => {
    fetch('http://localhost:3001/v1/members/'+user_id+'/'+group_id,{
        method: 'DELETE',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
    })
    .then(res => res.json())
    .then(msg =>{
        console.log(msg);
        dispatch({
            type: DELETE_MEMBER,
            user_id: user_id,
            group_id: group_id
        });
    })
    .catch(error => {
        console.log('error while deleting member');
    })
}