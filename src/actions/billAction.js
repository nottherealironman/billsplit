import { FETCH_BILL_LIST, ADD_BILL } from './constants/action-types';

export const fetchBillList = (token) => dispatch =>{
    fetch('http://localhost:3001/v1/bills',{
        method: 'GET',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
    })
    .then(res => res.json())
    .then(bills =>
        dispatch({
            type: FETCH_BILL_LIST,
            payload: bills
        }))
    .catch(error =>{
        console.log("Error in fetching bills");
    })
} 

// Method to add bill 
export const addBill = (token, newBill) => dispatch => {
    fetch('http://localhost:3001/v1/bills',{
        method: 'POST',
        headers: new Headers({
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify(newBill)
    })
    .then(res => res.json())
    .then(bill =>{
        console.log(bill);
        dispatch({
            type: ADD_BILL,
            payload: bill
        });
    })
    .catch(error => {
        console.log('error while adding bill');
    })
}