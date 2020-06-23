import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/userAction';

export class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.signup(user);
    }

    componentWillReceiveProps(nextProps){
        const token = nextProps.user.token;
        // Store auth token in local storage after signup
        localStorage.setItem('billsplit.token:',token);
    }

    render() {
        
        return (
            <div className="row d-flex justify-content-center align-items-center login-wrapper">
                <div className="col-md-4 mt-100">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.onSubmit} id="signup" method="post">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" className="form-control" id="name" value={this.state.name} onChange={this.onChange} placeholder="Enter name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" className="form-control" id="email" value={this.state.email} onChange={this.onChange} placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" className="form-control" id="password" value={this.state.password} onChange={this.onChange} placeholder="Enter password" />
                                </div>
                                <button type="submit" className="btn btn-secondary form-control">Sign up</button>
                            </form>
                            <div className="row d-flex justify-content-center align-items-center">
                                or
                                </div>
                            <div className="row d-flex justify-content-center align-items-center">
                                <Link to="/">Sign in</Link>
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

export default connect(mapStateToProps, { signup })(Signup);
