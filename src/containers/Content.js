import React, { Component } from 'react';
import ResponsiveMenu from '../components/ResponsiveMenu';
import { Link } from 'react-router-dom';
import { Button, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/userAction';

const FA = require('react-fontawesome');
var token;

export class Content extends Component {

    logout(){
        token = localStorage.getItem('billsplit.token') || this.props.user.token;
        this.props.logout(token);
    }

    render() {
        return (
            <div id="content">
                <div className="nav navbar-nav ml-auto btn-group float-right" style={{ marginRight: '20px' }}>
                    <Link href="#" className="dropdown-toggle account" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FA className="fa fa-user" /> Account
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to='groups'>Dashboard</Link>
                        <div className="dropdown-divider" />
                        <Button className="dropdown-item" onClick={e=> this.logout()}>Logout</Button>
                    </div>
                </div>
                <div className="block"></div>
                <ResponsiveMenu />
                <h5>WELCOME {this.props.user.name}</h5>
                {this.props.content}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.userInfo.info
});

const mapDispatchToProps = (dispatch) => ({
    logout: (token) => dispatch(logout(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
