import React, { Component } from 'react';
import { Modal, Button, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchExpenseSummary, fetchExpenseDetails } from '../actions/expensesAction';

// Components import 
import Sidebar from '../components/Sidebar';
import Content from './Content';

var token;

export class TrackExpenses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsModalStatus: false,
            currentUserId: null,
            groupId: null,
            groupName: '',
        }
    }

    componentWillMount() {
        token = localStorage.getItem('billsplit.token') || this.props.user.token;
        this.props.fetchExpenseSummary(token);
        this.setState({ currentUserId: this.props.user.id });
    }

    // Method to handle opening and closing of add modal
    handleDetailsModal(e, group_id, group_name='') {
        this.setState({ detailsModalStatus: !this.state.detailsModalStatus, groupId: group_id, groupName: group_name});
        if(group_id != null){
            this.props.fetchExpenseDetails(token, group_id);
        }
    }

    // Method to display expenses summary
    displayExpenseSummary = (expenses) => {
        return Object.keys(expenses).map((key, value) => {
            let group_id = expenses[key]._id;
            let group_name = expenses[key].group_name;
            let amount = expenses[key].total;
            return (
                <div className="col-md-3 mb-25" key={key}>
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
                                onClick={e => this.handleDetailsModal(e, group_id, group_name)}>
                                Details
                                </Button>
                        </div>
                    </div>
                </div>);
        });
    }

     // Method to display expenses details
     displayExpenseDetails = (details) => {
        return Object.keys(details).map((key, value) => {
            if(details[key].share > 0){
                return(
                    <React.Fragment key={key}>
                        <dt>{details[key].name}</dt>
                        <dd> Amount contribured: ${details[key].spent}</dd>
                        <dd> Amount to be received: $ {details[key].share}</dd>
                    </React.Fragment>
                );
               
            }
            else{
                return(
                    <React.Fragment key={key}>
                        <dt>{details[key].name}</dt>
                        <dd> Amount contribured: $ {details[key].spent}</dd>
                        <dd> Amount to be given: $ {Math.abs(details[key].share)}</dd>
                    </React.Fragment>
                );
            }
            
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
                <Modal show={this.state.detailsModalStatus} onHide={e => this.handleDetailsModal(e, null)}>
                    <Modal.Header closeButton>
                        <h5 className="modal-title" id="addModalLabel">Expenses details of <strong>{this.state.groupName}</strong></h5>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                {this.displayExpenseDetails(this.props.details)}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={e => this.handleDetailsModal(e, null)}>
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
    expenses: state.expenses.summary,
    details: state.expenses.details,
});

const mapDispatchToProps = (dispatch) => ({
    fetchExpenseSummary: (token) => dispatch(fetchExpenseSummary(token)),
    fetchExpenseDetails : (token, group_id) => dispatch(fetchExpenseDetails(token, group_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackExpenses);
