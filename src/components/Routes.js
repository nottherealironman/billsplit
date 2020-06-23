import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";

// Components import 
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Group from '../containers/Group';

export class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/app/group' component={Group}/> 
                    <Route path='/signup' component={Signup}/> 
                    <Route path='/' component={Login}/>
                </Switch>
            </div>
        )
    }
}

export default Routes
