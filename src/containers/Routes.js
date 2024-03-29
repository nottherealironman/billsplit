import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import { connect } from 'react-redux';

// Components import 
import Login from './Login';
import Signup from './Signup';
import Groups from './Groups';
import Members from './Members';
import Bills from './Bills';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { fetchUserInfo } from '../actions/userAction';

export class Routes extends Component {
   
    // This method will be invoked before render and used to fetch the current user info 
    componentWillMount() {
        let token = localStorage.getItem('billsplit.token');
        this.props.fetchUserInfo(token);
    }

    render() {
        return (
            <div>
                <Switch>
                    <ProtectedRoute path='/app/groups' user={this.props.user} component={Groups}/>
                    <ProtectedRoute path='/app/members' user={this.props.user} component={Members}/> 
                    <ProtectedRoute path='/app/bills' user={this.props.user} component={Bills}/> 
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
