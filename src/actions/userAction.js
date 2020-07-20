import { LOGIN, SIGNUP, FETCH_USER_INFO, LOGOUT } from './constants/action-types';

// Method to fetch information of current user
export const fetchUserInfo = (token) => dispatch => {
        fetch('http://localhost:3001/v1/users/dashboard', {
            method: 'POST',
            headers: new Headers({
                // Send token in header
                'Authorization': `JWT ${token}`,
                'content-type': 'application/json'
            }),
        })
        .then(res => res.json())
        .then(user =>
            dispatch({
                type: FETCH_USER_INFO,
                payload: user
            }))
        .catch(error => {
            console.log('error while fetching data');
        });
}

// user signup
export const signup = (formData) => dispatch => {
    fetch('http://localhost:3001/v1/users/signup', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(formData),
    })
        .then(res => res.json())
        .then(user => dispatch({
            type: SIGNUP,
            payload: user
        }))
        .catch(error => {
            console.log('error while fetching data');
        });;
}

// user login
export const login = (formData) => dispatch => {
    fetch('http://localhost:3001/v1/users/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(formData),
    })
        .then(res => res.json())
        .then(user => dispatch({
            type: LOGIN,
            payload: user
        }))
        .catch(error => {
            console.log('error while fetching data');
        });
}

// user logout
export const logout = (token) => dispatch => {
    fetch('http://localhost:3001/v1/users/logout', {
        method: 'POST',
        headers: new Headers({
            // Send token in header
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        }),
    })
        .then(res => res.json())
        .then(user => dispatch({
            type: LOGOUT,
            payload: user
        }))
        .catch(error => {
            console.log('error while logging out');
        });
}

