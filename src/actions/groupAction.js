import { ADD_GROUP, FETCH_GROUP_LIST, UPDATE_GROUP, DELETE_GROUP } from '../actions/constants/action-types';

// This method will fetch list of groups where current user is member
export const fetchGroupList = (token) => dispatch => {
    fetch('http://localhost:3001/v1/groups',{
        method: 'GET',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
    })
    .then(res => res.json())
    .then(group =>
        dispatch({
            type: FETCH_GROUP_LIST,
            payload: group
        }))
    .catch(error => {
        console.log('error while fetching group');
    })
}

// This method will create new group 
export const addGroup = (token, formData) => dispatch => {
    fetch('http://localhost:3001/v1/groups',{
        method: 'POST',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(newGroup =>{
        dispatch({
            type: ADD_GROUP,
            payload: newGroup
        });
    })
    .catch(error => {
        console.log('error while adding group');
    })
}

// This method will update group 
export const updateGroup = (token, id, formData) => dispatch => {
    fetch('http://localhost:3001/v1/groups/'+id,{
        method: 'PUT',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(updatedGroup =>{
        dispatch({
            type: UPDATE_GROUP,
            payload: updatedGroup
        });
    })
    .catch(error => {
        console.log('error while updating group');
    })
}

// This method will delete group 
export const deleteGroup = (token, id) => dispatch => {
    fetch('http://localhost:3001/v1/groups/'+id,{
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
            type: DELETE_GROUP,
            payload: id
        });
    })
    .catch(error => {
        console.log('error while deleting group');
    })
}