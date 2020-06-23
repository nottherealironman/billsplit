import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../actions/userAction';

// Components import 
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
// Assets import


export class Group extends Component {

    componentDidMount() {
        let token = localStorage.getItem('billsplit.token');
        console.log(token);
        this.props.fetchUserInfo(token);
    }

    content() {
        return (
            <div>
                <h3 className="mb-25">Groups</h3>
                <p>This is group component.</p>
            </div>
        );
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar />
                <Content content={this.content()} />

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userInfo.info
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserInfo: (token) => dispatch(fetchUserInfo(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Group);
