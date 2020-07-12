import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/userAction';

/* When user refresh page, login component will be called as well (due to '/' default route)*/
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(user);
    }

    componentWillReceiveProps(nextProps) {
        var token = nextProps.user.token;
        // Store auth token in local storage after login
        if (token !== undefined) {
            localStorage.setItem('billsplit.token', token);
        }
        // Redirect to the same page from where user was before
        const { from } = this.props.location.state || { from: { pathname: "/app/groups" } };
        this.props.history.push(from);
    }

    render() {
        
        return (
            <div>
                <div className="row d-flex justify-content-center align-items-center login-wrapper">
                    <div className="col-md-4 mt-100">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.onSubmit} id="login" method="post">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" className="form-control" id="email" value={this.state.email} onChange={this.onChange} placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" className="form-control" id="password" value={this.state.password} onChange={this.onChange} placeholder="Enter password" />
                                    </div>
                                    <button type="submit" className="btn btn-secondary form-control">Login</button>
                                </form>
                                <div className="row d-flex justify-content-center align-items-center">
                                    or
                                </div>
                                <div className="row d-flex justify-content-center align-items-center">
                                    <Link to="/signup">Sign up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userInfo.info
});

export default connect(mapStateToProps, { login })(Login);
