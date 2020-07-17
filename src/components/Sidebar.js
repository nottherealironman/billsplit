import React, { Component } from 'react'
import { Link } from 'react-router-dom';
var FA = require('react-fontawesome');

class Sidebar extends Component {
    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Bill Splits</h3>
                </div>
                <ul className="list-unstyled components">
                    <li>
                        <Link to="groups">
                            <FA name="users" className="fas fa-users" />
                                Groups
                            </Link>
                    </li>
                    <li>
                        <Link to="members">
                            <FA name="user" className="fas fa-user" />
                                Members
                            </Link>
                    </li>
                    <li>
                        <Link to="bills">
                            <FA name="note" className="fas fa-sticky-note" />
                                Bills
                            </Link>
                    </li>
                    <li>
                        <Link to="track-expenses">
                            <FA name="expense" className="fas fa-money" />
                            Track Expenses
                            </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Sidebar
