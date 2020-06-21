const express = require('express');
const groupsController = require('../controllers/groups.controller');
const auth = require('../middlewares/auth.middleware');
const groupsRoutes = express.Router();

// Protected routes of group 
groupsRoutes.get('/', auth.checkAuth, groupsController.getAll);
groupsRoutes.get('/:id', auth.checkAuth, groupsController.getOne);
groupsRoutes.post('/', auth.checkAuth, groupsController.create);
groupsRoutes.put('/:id', auth.checkAuth, groupsController.update);
groupsRoutes.delete('/:id', auth.checkAuth, groupsController.delete);

module.exports = groupsRoutes;