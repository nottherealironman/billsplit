import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import { connect } from 'react-redux';

// Components import 
import Login from './Login';
import Signup from './Signup';
import Group from './Group';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { fetchUserInfo } from '../actions/userAction';

export class Routes extends Component {
   
    componentWillMount() {
        let token = localStorage.getItem('billsplit.token');
        this.props.fetchUserInfo(token);
    }

    render() {
        return (
            <div>
                <Switch>
                    <ProtectedRoute path='/app/group' user={this.props.user} component={Group}/> 
                    <Route path='/signup' component={Signup}/> 
                    <Route exact path='/' component={Login}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userInfo.info
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserInfo: (token) => dispatch(fetchUserInfo(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
