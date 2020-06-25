import React, { Component } from 'react';
import { Modal, Button,  } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../actions/userAction';

// Components import 
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

export class Group extends Component {

    constructor(props){
        super(props);
        this.state = {
            status:false
        }
    }

    componentWillMount() {
        console.log(this.props.user);
    }

    handleModal = () => {
        this.setState({status:!this.state.status});
    }

    content() {
        return (
            <div>
                <h3 className="mb-25">Groups</h3>
                <Button variant="secondary" onClick={this.handleModal}>
                    Add Group
                </Button>

                <Modal show={this.state.status} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                    <h5 className="modal-title" id="addModalLabel">Add New Group</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post" id="group-form">
                        <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" className="form-control" id="name" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" className="form-control" id="description" rows={5} defaultValue={""} />
                        </div>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleModal}>
                        Save
                    </Button>
                    </Modal.Footer>
                </Modal>
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

/* const mapStateToProps = (state) => ({
    user: state.userInfo.info
}); */

/* const mapDispatchToProps = (dispatch) => ({
    fetchUserInfo: (token) => dispatch(fetchUserInfo(token))
}); */

export default Group;
