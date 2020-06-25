import React from 'react';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router';

export const ProtectedRoute = ({component : Component, user, ...rest}) => (
    <Route {...rest} render={(props) => (
        user.logged_in === true ? <Component user={user} />: <Redirect to={{pathname:'/', state: {from: props.location}}} />
    )} />
)