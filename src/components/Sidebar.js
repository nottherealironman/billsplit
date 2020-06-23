import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Bill Splits</h3>
                </div>
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/groups">
                            <i className="fas fa-users" />
                                Group
                            </Link>
                    </li>
                    <li>
                        <Link to="/members">
                            <i className="fas fa-user" />
                                Members
                            </Link>
                    </li>
                    <li>
                        <Link to="/bills">
                            <i className="fas fa-sticky-note" />
                                Members
                            </Link>
                    </li>
                    <li>
                        <Link to="/expenses">
                            <i className="fas fa-money-check-alt" />
                                Individual Share
                            </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Sidebar
