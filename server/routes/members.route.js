const express = require('express');
const membersController = require('../controllers/members.controller');
const auth = require('../middlewares/auth.middleware');
const membersRoutes = express.Router();

// Protected routes of member 
membersRoutes.get('/', auth.checkAuth, membersController.getAll);
membersRoutes.post('/search', auth.checkAuth, membersController.search);
membersRoutes.post('/', auth.checkAuth, membersController.create);
//membersRoutes.put('/:id', auth.checkAuth, membersController.update);
membersRoutes.delete('/:user_id/:group_id', auth.checkAuth, membersController.delete);

module.exports = membersRoutes;