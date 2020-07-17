import React, { Component } from 'react';
import { Modal, Button, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchGroupSummary } from '../actions/expensesAction';

// Components import 
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

const token = localStorage.getItem('billsplit.token');

export class TrackExpenses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsModalStatus: false,
            currentUserId: null,
            modelTitle: 'Expenses details',
            groupId: 'null',
        }
    }

    componentWillMount() {
        this.props.fetchGroupSummary(token);
        this.setState({ currentUserId: this.props.user.id });
    }

    // Method to handle opening and closing of add modal
    handleDetailsModal(e) {
        this.setState({ detailsModalStatus: !this.state.detailsModalStatus, modelTitle: 'Add new bill' });
    }

    // Method to display expenses summary
    displayExpenseSummary = (bills) => {
        console.log("lists: ", bills)
        return Object.keys(bills).map((billsKey, value) => {
            let id = bills[billsKey]._id;
            let group_name = bills[billsKey].group_name;
            let amount = bills[billsKey].total;
            return (
                <div className="col-md-3 mb-25 js-bill-item">
                    <div className="card h-100">
                        <div className="card-body">{/* 
                            <h6 className="card-subtitle mb-2 text-muted">{title}</h6> */}
                            <p className="card-text">
                            </p><dt>Group</dt><dd>{group_name}</dd>
                            <dt>Total expenses</dt><dd>${amount}</dd>
                            <p />
                        </div>
                        <div className="card-footer">
                            <Button
                                className="btn btn btn-outline-danger btn-block js-btn-delete"
                                title="Delete"
                                onClick={e => this.handleDetailsModal(e, id)}>
                                Details
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
                <h3 className="mb-25">Expenses</h3>

                <div className="row mb-25">
                    {this.props.expenses.length ? this.displayExpenseSummary(this.props.expenses) : <div></div>}
                </div>

                {/* Group summary details modal */}
                <Modal show={this.state.detailsModalStatus} onHide={e => this.handleDetailsModal(e)}>
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
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={e => this.handleDetailsModal(e)}>
                            Close
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
    expenses: state.expenses.lists,
});

const mapDispatchToProps = (dispatch) => ({
    fetchGroupSummary: (token) => dispatch(fetchGroupSummary(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackExpenses);
