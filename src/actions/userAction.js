import { LOGIN, SIGNUP, FETCH_USER_INFO } from './constants/action-types';

/* export const fetchUserInfo = () => dispatch => {
    fetch('http://localhost:3001/v1/user/')
        .then(res => res.json())
        .then(user =>
            dispatch({
                type: FETCH_USER_INFO,
                payload: user
            }));
} */

// user signup
export const signup = (formData) => dispatch => {
    fetch('http://localhost:3001/v1/users/signup',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(user => dispatch({
            type: SIGNUP,
            payload: user
        }));
}

// user login
export const login = (formData) => dispatch => {
    fetch('http://localhost:3001/v1/users/login',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(user => dispatch({
            type: LOGIN,
            payload: user
        }))
        .catch(error =>{
            console.log('error while fetching data');
        });
}

