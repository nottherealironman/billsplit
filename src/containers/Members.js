import React, { Component } from 'react';
import { Modal, Button, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchMemberList, searchMember, addMember, resetModalState } from '../actions/memberAction';
import { fetchGroupList } from '../actions/groupAction';

// Components import 
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

const token = localStorage.getItem('billsplit.token');

export class Members extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addOrUpdateModalStatus: false,
            deleteModalStatus: false,
            currentMemberId: null,
            modelTitle: 'Add new member',
            group_id: null,
            email: ''
        }
    }

    componentWillMount() {
        this.props.fetchGroupList(token);
        this.props.fetchMemberList(token);
    }

    // Method to handle data from group add form
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // Method to track keyboard input
    onEmailChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.props.searchMember(token, e.target.value, this.state.group_id);
    }

    // Method to handle opening and closing of add modal
    handleAddModal(e, closeStatus) {
        this.setState({ addOrUpdateModalStatus: !this.state.addOrUpdateModalStatus, modelTitle: 'Add New Member' });
        console.log(closeStatus, "close status")
        // If modal is closed, reset the modal state
        if(closeStatus){
            this.props.resetModalState();
        }
    }

    // Method to handle member add
    addMember (e, user_id, group_id) {
        e.preventDefault();
        const member = {
            user_id: user_id,
            group_id: group_id,
        }
        this.props.addMember(token, member);
        this.props.fetchMemberList(token);
    }

    // Method to handle opening and closing of delete modal
    handleDeleteModal(e, user_id, group_id) {
        /* this.setState({ deleteModalStatus: !this.state.deleteModalStatus });
        // Store the current group id in state
        if (id !== null) {
            this.setState({ currentGroupId: id });
        } */
    }

    // Method to display member list on search by email while adding new member
    memberSearchList() {
        let users = this.props.searchList;
        return Object.keys(users).map((key, value) => {
            if(users[key].members.length > 0){
                return (
                    <li className="list-group-item">
                        {users[key].name}
                        <Button variant="secondary" type="button" className="float-right" disabled> Added </Button>
                    </li>
                )
            }
            else{
                return (
                    <li className="list-group-item">
                        {users[key].name}
                        <Button variant="success" type="button" className="float-right" onClick={e => this.addMember(e, users[key]._id, this.state.group_id)}> Add </Button>
                    </li>
                )
            }
        });

    }

    // Method to display 
    /* displayMemberList(list, group_name, group_id) {
        let count = 0;
        return Object.keys(list).map((key, value) => {
            count++;
            return (
                <React.Fragment>
                    <tr key={key}>
                        {count === 1 ? <td rowSpan={list.length}>{group_name}</td> : null}
                        <td scope='row'>{list[key].name}</td>
                        <td>
                            <Button variant="danger" onClick={e => this.handleDeleteModal(e, list[key]._id, group_id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                </React.Fragment>
            )
        });
    } */

    
    // Method to display members row
    displayMember = (members) => {
        return Object.keys(members).map((membersKey, value) => {
            let count = 0;
            let list = members[membersKey].user_info;
            let group_name = members[membersKey].group_name;
            let group_id = members[membersKey]._id;
            return Object.keys(list).map((key, value) => {
                count++;
                return (
                    <React.Fragment>
                        <tr key={key}>
                            {count === 1 ? <td rowSpan={list.length}>{group_name}</td> : null}
                            <td scope='row'>{list[key].name}</td>
                            <td>
                                <Button variant="danger" onClick={e => this.handleDeleteModal(e, list[key]._id, group_id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    </React.Fragment>
                )
            });
            //return (this.displayMemberList(members[membersKey].user_info, members[membersKey].group_name, members[membersKey]._id));
        });
    }

    // Method to display groups in drop-down list of member add form
    displayGroups(groups) {
        return Object.keys(groups).map((key, value) => {
            return (
                <React.Fragment>
                    <option value={groups[key]._id}>{groups[key].name}</option>
                </React.Fragment>
            );
        });
    }

    // Method to display the content of page
    content() {
        return (
            <div>
                <h3 className="mb-25">Members</h3>
                <Button variant="secondary" className="mb-20" onClick={e => this.handleAddModal(e, null)}>
                    Add Member
                </Button>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Group</th>
                                            <th scope="col">Member</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.members.length ? this.displayMember(this.props.members) : <tr><td>'No members found!'</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Add new member modal */}
                <Modal show={this.state.addOrUpdateModalStatus} onHide={e => this.handleAddModal(e, true)}>
                    <Modal.Header closeButton>
                        <h5 className="modal-title" id="addModalLabel">{this.state.modelTitle}</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post" id="group-form">
                            <div className="form-group">
                                <label htmlFor="name">Group</label>
                                <select name="group_id" className="form-control" onChange={e => this.onChange(e)} >
                                    <option value="">Select group</option>
                                    {this.displayGroups(this.props.groups)}
                                </select>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="email">Search email</label>
                                <input type="email" name="email" className="form-control" placeholder="Enter registered email" onChange={e => this.onEmailChange(e)} />
                            </div>
                            <ul className="list-group list-group-flush">
                                {this.memberSearchList()}
                            </ul>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={e => this.handleAddModal(e, true)}>
                            Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    render() {
        console.log(this.props.groups)
        return (
            <div className="wrapper">
                <Sidebar />
                <Content content={this.content()} user={this.props.user} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    members: state.members.lists,
    searchList: state.members.searchList,
    groups: state.group.lists,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMemberList: (token) => dispatch(fetchMemberList(token)),
    searchMember: (token, email, group_id) => dispatch(searchMember(token, email, group_id)),
    resetModalState: () => dispatch(resetModalState()),
    addMember: (token, user_id, group_id) => dispatch(addMember(token, user_id, group_id)),
    fetchGroupList: (token) => dispatch(fetchGroupList(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
