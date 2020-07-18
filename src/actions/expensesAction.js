import { FETCH_GROUP_EXPENSES_SUMMARY, FETCH_GROUP_EXPENSES_DETAILS } from '../actions/constants/action-types';

// This method will fetch list of summary of groups on which current user is member
export const fetchExpenseSummary = (token) => dispatch => {
    fetch('http://localhost:3001/v1/expenses/summary', {
        method: 'GET',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
    })
    .then(res => res.json())
    .then(summary =>
        dispatch({
            type: FETCH_GROUP_EXPENSES_SUMMARY,
            payload: summary
        }))
    .catch(error => {
        console.log('error while fetching group summary');
    })
}

// This method will fetch expense details of groups on which current user is member
export const fetchExpenseDetails = (token, groupId) => dispatch => {
    fetch('http://localhost:3001/v1/expenses/details/'+groupId, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
    })
    .then(res => res.json())
    .then(details =>
        dispatch({
            type: FETCH_GROUP_EXPENSES_DETAILS,
            payload: details
        }))
    .catch(error => {
        console.log('error while fetching group details');
    })
}