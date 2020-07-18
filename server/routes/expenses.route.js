const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const auth = require('../middlewares/auth.middleware');
const expensesRoutes = express.Router();

// Routes for bill 
expensesRoutes.get('/summary', auth.checkAuth, expensesController.getExpenseSummary);
expensesRoutes.get('/details/:group_id', auth.checkAuth, expensesController.getExpenseDetails);

module.exports = expensesRoutes;