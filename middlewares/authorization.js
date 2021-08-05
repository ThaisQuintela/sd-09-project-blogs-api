const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtNotFound = {
  error: {
    code: 'jwtNotFound',
    message: 'Token not found',
  },
};

const jwtInvalid = {
  error: {
    code: 'jwtInvalid',
    message: 'Expired or invalid token',
  },  
};

const authorization = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) next(jwtNotFound);
  try {
    jwt.verify(token, secret);
  } catch (err) {
    throw jwtInvalid;
  }
  next();
};

module.exports = authorization;