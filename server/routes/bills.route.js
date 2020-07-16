const express = require('express');
const billsController = require('../controllers/bills.controller');
const auth = require('../middlewares/auth.middleware');
const billsRoutes = express.Router();

// Protected routes for bills
billsRoutes.get('/', auth.checkAuth, billsController.getAll);
billsRoutes.post('/', auth.checkAuth, billsController.add);
billsRoutes.get('/getGroupMembers/:group_id', auth.checkAuth, billsController.getGroupMembers);
billsRoutes.delete('/delete/:id', billsController.delete);

module.exports = billsRoutes;