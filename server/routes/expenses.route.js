const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const expensesRoutes = express.Router();

// Routes for bill 
expensesRoutes.get('/getGroupSummary', expensesController.getGroupSummary);
expensesRoutes.get('/getGroupDetails/:group_id', expensesController.getGroupDetails);

module.exports = expensesRoutes;