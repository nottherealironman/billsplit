import React, { Component } from 'react';
import { Modal, Button, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchBillList, addBill, deleteBill } from '../actions/billAction';
import { fetchGroupList } from '../actions/groupAction';

// Components import 
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

const token = localStorage.getItem('billsplit.token');

export class Bills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addOrUpdateModalStatus: false,
            deleteModalStatus: false,
            currentUserId: null,
            deleteBillId: null,
            modelTitle: 'Add new bill',
            billId: null,
            billTitle: '',
            billAmount: '',
            billGroupId: 'null',
        }
    }

    componentWillMount() {
        this.props.fetchGroupList(token);
        this.props.fetchBillList(token);
        this.setState({ currentUserId: this.props.user.id });
    }

    // Method to handle data from group add form
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // Method to handle opening and closing of add modal
    handleAddModal(e) {
        this.setState({ addOrUpdateModalStatus: !this.state.addOrUpdateModalStatus, modelTitle: 'Add new bill' });
    }

    // Method to add new bill
    addBill(e) {
        e.preventDefault();
        this.setState({ addOrUpdateModalStatus: !this.state.addOrUpdateModalStatus });
        const bill = {
            title: this.state.billTitle,
            amount: this.state.billAmount,
            group_id: this.state.billGroupId,
            user_id: this.state.currentUserId
        }
        this.props.addBill(token, bill);
    }

    // Method to handle opening and closing of delete modal
    handleDeleteModal(e, billId) {
        this.setState({ deleteModalStatus: !this.state.deleteModalStatus, deleteBillId: billId });
    }

    // Method to delete bill
    deleteBill(e) {
        console.log(this.state.deleteBillId);
        this.setState({ deleteModalStatus: !this.state.deleteModalStatus });
        this.props.deleteBill(token, this.state.deleteBillId);
    }

    // Method to display groups in drop-down list of member add form
    displayGroups(groups) {
        return Object.keys(groups).map((key, value) => {
            return (
                <React.Fragment key={key}>
                    <option value={groups[key]._id}>{groups[key].name}</option>
                </React.Fragment>
            );
        });
    }

    // Method to display list of bills
    displayBill = (bills) => {
        console.log("lists: ", bills)
        return Object.keys(bills).map((billsKey, value) => {
            let id = bills[billsKey]._id;
            let title = bills[billsKey].title;
            let group_name = bills[billsKey].groups.name;
            let amount = bills[billsKey].amount;
            let paid_by = bills[billsKey].users._id === this.state.currentUserId ? 'You' : bills[billsKey].users.name;
            return (
                <div className="col-md-3 mb-25" key={billsKey}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
                            <p className="card-text">
                            </p><dt>Group</dt><dd>{group_name}</dd>
                            <dt>Amount</dt><dd>${amount}</dd>
                            <dt>Paid by</dt><dd>{paid_by}</dd>
                            <p />
                        </div>
                        <div className="card-footer">
                            <Button
                                className="btn btn btn-outline-danger btn-block js-btn-delete"
                                title="Delete"
                                onClick={e => this.handleDeleteModal(e, id)}>
                                Delete
                                </Button>
                        </div>
                    </div>
                </div>);
        });
    }

    // Method to display the content of page
    content() {
        return (
            <div>
                <h3 className="mb-25">Bills</h3>

                <div className="row mb-25 js-first-row">
                    <div className="col-md-3 mb-25">
                        <div className="card h-100">
                            <div className="card-body">
                                <center>
                                    <Button variant="light" onClick={e => this.handleAddModal(e)}>
                                        <img src="/add-icon.png" className="pt-20" alt="Card image cap" width="150 px" height="150 px" />
                                    </Button>
                                </center>
                            </div>
                            <div className="card-footer">
                                <Button variant="light" className="btn btn-outline-success btn-block" onClick={e => this.handleAddModal(e, null)}>
                                    Add New Bill
                                </Button>
                            </div>
                        </div>
                    </div>

                    {this.props.bills.length ? this.displayBill(this.props.bills) : <div></div>}
                </div>

                {/* Add new bill modal */}
                <Modal show={this.state.addOrUpdateModalStatus} onHide={e => this.handleAddModal(e)}>
                    <Modal.Header closeButton>
                        <h5 className="modal-title" id="addModalLabel">{this.state.modelTitle}</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post" id="bill-form">
                            <div className="form-group">
                                <label htmlFor="name">Title</label>
                                <input type="text" name="billTitle" className="form-control" onChange={e => this.onChange(e)} placeholder="Enter title for bill" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <div className="input-group">
                                    <span className="input-group-prepend input-group-text">$</span>
                                    <input type="text" name="billAmount" className="form-control" onChange={e => this.onChange(e)} placeholder="Enter amount paid" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="group_id">In which group you want to add bill?</label>
                                <select name="billGroupId" className="form-control" onChange={e => this.onChange(e)} >
                                    <option value="null">Select group</option>
                                    {this.displayGroups(this.props.groups)}
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={e => this.handleAddModal(e)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.state.billId != null ? e => this.updateBill(e) : e => this.addBill(e)}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete group modal */}
                <Modal show={this.state.deleteModalStatus} onHide={e => this.handleDeleteModal(e, null, null)}>
                    <Modal.Header closeButton>
                        <h5 className="modal-title" id="addModalLabel">Delete bill</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this bill?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={e => this.handleDeleteModal(e, null, null)}>
                            No
                    </Button>
                        <Button variant="primary" onClick={e => this.deleteBill(e)}>
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
                <Content content={this.content()} user={this.props.user} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bills: state.bills.lists,
    groups: state.group.lists,
});

const mapDispatchToProps = (dispatch) => ({
    fetchBillList: (token) => dispatch(fetchBillList(token)),
    addBill: (token, bill) => dispatch(addBill(token, bill)),
    deleteBill: (token, bill_id) => dispatch(deleteBill(token, bill_id)),
    fetchGroupList: (token) => dispatch(fetchGroupList(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bills);
