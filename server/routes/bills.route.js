const express = require('express');
const billsController = require('../controllers/bills.controller');
const billsRoutes = express.Router();

// Routes for bill 
billsRoutes.post('/add', billsController.add);
billsRoutes.get('/getAll', billsController.getAll);
billsRoutes.get('/getGroupMember/:group_id', billsController.getGroupMember);
billsRoutes.delete('/delete/:id', billsController.delete);

module.exports = billsRoutes;