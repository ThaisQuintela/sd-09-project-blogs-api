const express = require('express');
const rescue = require('express-rescue');
const UserController = require('./userController');
// const validateAuth = require('../middlewares/validateAuth');
const { validateUser, validateLogin } = require('./userMiddleware');

const usersRouter = express.Router();

usersRouter.post(
  '/user',
  rescue(validateUser), 
  rescue(UserController.create),
);
usersRouter.post(
  '/login',
  rescue(validateLogin), 
  rescue(UserController.login),
);
// usersRouter.post('/users/admin', validateAuth, validateUser, UsersController.createAdmin);

module.exports = usersRouter;
