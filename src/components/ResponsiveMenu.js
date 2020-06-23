import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                                    <i className="fas fa-users" /> Group
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/members">
                                    <i className="fas fa-user" /> Member
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bills">
                                    <i className="fas fa-sticky-note" /> Bills
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/expenses">
                                    <i className="fas fa-money-check-alt" /> Track Expenses
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
