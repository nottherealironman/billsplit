const express = require('express');
const usersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const usersRoutes = express.Router();

usersRoutes.post('/signup', usersController.signup);
usersRoutes.post('/login', usersController.login);

// Protected routes for user 
usersRoutes.post('/dashboard', auth.checkAuth, usersController.dashboard);
usersRoutes.post('/logout', auth.checkAuth, usersController.logout);

module.exports = usersRoutes;