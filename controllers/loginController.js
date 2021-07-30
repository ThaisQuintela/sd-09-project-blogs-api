const express = require('express');
const mdwLogin = require('../middlewares/mdwLogin');

const loginRouter = express.Router();

loginRouter.post('/',
  mdwLogin.loginObjectValidator,
  mdwLogin.loginExistsValidator,
  mdwLogin.loginTokenGenerator);

module.exports = loginRouter;