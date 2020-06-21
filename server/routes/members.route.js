const express = require('express');
const membersController = require('../controllers/members.controller');
const auth = require('../middlewares/auth.middleware');
const membersRoutes = express.Router();

// Protected routes of member 
membersRoutes.get('/', auth.checkAuth, membersController.getAll);
//membersRoutes.get('/:id', auth.checkAuth, membersController.getOne);
membersRoutes.post('/', auth.checkAuth, membersController.create);
//membersRoutes.put('/:id', auth.checkAuth, membersController.update);
membersRoutes.delete('/:id', auth.checkAuth, membersController.delete);

module.exports = membersRoutes;