import React, { Component } from 'react';
import { Modal, Button,  } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchGroupList, addGroup, updateGroup, deleteGroup } from '../actions/groupAction';
import { convertToReadableDate } from '../helpers/index';

// Components import 
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

const token = localStorage.getItem('billsplit.token');

export class Group extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            addModalStatus:false,
            //updateModalStatus:false,
            deleteModalStatus:false,
            currentGroupId:null,
            modelTitle: '',
            id:null,
            name:'',
            description:''
        }
        //this.handleDeleteModal = this.handleDeleteModal.bind(this)
        //this.handleEditModal = this.handleEditModal.bind(this);
    }

    componentWillMount() {
        this.props.fetchGroupList(token);
    }

    search(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i]._id === nameKey) {
                return myArray[i];
            }
        }
    }

    // Method to handle opening and closing of add modal
    handleAddModal (e, id){
        this.setState({addModalStatus:!this.state.addModalStatus});
        if(id != null){
            console.log("Edit", id);
            const result = this.search(id, this.props.group);
            this.setState({modelTitle:'Update Group', id:id, name:result.name, description:result.description});
        }
        else {
            console.log("Add");
            this.setState({modelTitle:'Add New Group', id:null, name:'', description:''});
        }
        console.log(this.state.id != null ? 'Edit mode': 'Add mode')
    }

    /* handleAddModal = () => {
        this.setState({addModalStatus:!this.state.addModalStatus});
    } */

    // Method to handle data from group add form
    onChange = (e) =>{
        this.setState({[e.target.name] : e.target.value});
    }

    // Method to handle group creation
    addGroup = () => {
        this.setState({addModalStatus:!this.state.addModalStatus});
        const group = {
            name: this.state.name,
            description: this.state.description,
        }
        this.props.addGroup(token, group);
        console.log(group);
    }

    // Method to handle group creation
    updateGroup = () => {
        this.setState({addModalStatus:!this.state.addModalStatus});
        const group = {
            name: this.state.name,
            description: this.state.description,
        }
        this.props.updateGroup(token, this.state.id, group);
    }

    // Method to handle opening and closing of delete modal
    handleDeleteModal(id){
        this.setState({deleteModalStatus:!this.state.deleteModalStatus});  
        // Store the current group id in state
        if(id !== null){
            this.setState({currentGroupId:id});
        }
    }

    // Method to confirm group delete
    deleteGroup(){
        // Close the modal
        this.setState({deleteModalStatus:!this.state.deleteModalStatus}); 
        let id = this.state.currentGroupId;
        // Delete the current group and fetch the updated group lists
        if(id !== null){
            this.props.deleteGroup(token, id);
        }
    }

    // Method to handle opening and closing of edit modal
    handleEditModal(id){
        console.log("id",id);
        /* this.setState({deleteModalStatus:!this.state.deleteModalStatus});  
        // Store the current group id in state
        if(id !== null){
            this.setState({currentGroupId:id});
        } */
    }

    // Method to confirm group edit
    editGroup(){
        // Close the modal
        this.setState({deleteModalStatus:!this.state.deleteModalStatus}); 
        let id = this.state.currentGroupId;
        // Delete the current group and fetch the updated group lists
        if(id !== null){
            this.props.deleteGroup(token, id);
        }
    }

    // Method to display group rows
    displayGroup = (groups) =>{
        return Object.keys(groups).map((key, value)=>{
            return (
                <tr key={key}>
                    <td scope='row'>{groups[key].name}</td>
                    <td>{convertToReadableDate(groups[key].createdAt)}</td>
                    <td>
                        <Button variant="info" className="mr-10" onClick={e => this.handleAddModal(e, groups[key]._id)}>
                            Edit
                        </Button>
                        <Button variant="danger" onClick={this.handleDeleteModal.bind(this, groups[key]._id)/* e => this.handleDeleteModal(e, groups[key]._id) */}>
                            Delete
                        </Button>
                    </td>
                </tr>  
            );
        });
    }

    content() {
        return (
            <div>
                <h3 className="mb-25">Groups</h3>
                <Button variant="secondary" className="mb-20" onClick={e => this.handleAddModal(e, null)}>
                    Add Group
                </Button>

                <div className="row">
                    <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                { this.props.group.length ? this.displayGroup(this.props.group) : <tr><td>'No groups found!'</td></tr> }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Add new group modal */}
                <Modal show={this.state.addModalStatus} onHide={e => this.handleAddModal(e, null)}>
                    <Modal.Header closeButton>
                    <h5 className="modal-title" id="addModalLabel">{this.state.modelTitle}</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post" id="group-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" className="form-control" defaultValue={this.state.name} onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" className="form-control" id="description" rows={5} defaultValue={this.state.description} onChange={this.onChange} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={e =>this.handleAddModal(e, null)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.state.id != null ? this.updateGroup: this.addGroup/* this.addGroup */}>
                        Save
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete group modal */}
                <Modal show={this.state.deleteModalStatus} onHide={this.handleDeleteModal.bind(this, null)}>
                    <Modal.Header closeButton>
                    <h5 className="modal-title" id="addModalLabel">Delete Group</h5>
                    </Modal.Header>
                    <Modal.Body>
                    <p>Are you sure you want to delete this group?</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleDeleteModal.bind(this, null)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={this.deleteGroup.bind(this)}>
                        Yes
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

const mapStateToProps = (state) => ({
    group: state.group.lists
});

const mapDispatchToProps = (dispatch) => ({
    fetchGroupList: (token) => dispatch(fetchGroupList(token)),
    addGroup: (token, formData) => dispatch(addGroup(token, formData)),
    updateGroup: (token, id, formData) => dispatch(updateGroup(token, id, formData)),
    deleteGroup: (token, id) => dispatch(deleteGroup(token, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
