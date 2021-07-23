import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var FA = require('react-fontawesome');

class ResponsiveMenu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light toggle-menu">
                <div className="container-fluid">
                    <a href="#responsive-menu" className="btn d-inline-block d-lg-none ml-auto" data-toggle="collapse">
                        <i className="fas fa-align-justify" />
                    </a>
                    <div className="collapse navbar-collapse" id="responsive-menu">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/groups">
                                    <FA name="users" className="fas fa-users" /> Groups
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/members">
                                    <FA name="user" className="fas fa-user" /> Members
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bills">
                                    <FA name="note" className="fas fa-sticky-note" /> Bills
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/expenses">
                                    <FA name="expense" className="fas fa-money" /> Track Expenses
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default ResponsiveMenu;
