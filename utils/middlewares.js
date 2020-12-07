const jwt = require('jsonwebtoken');
const logger = require('./logger');
const { JWT_CODE } = require('./constants');
const { ValidationError, AuthError }  = require("../customErrors");

const loggerMiddleware = (req, _res, next) => {
  logger.info({ payload: req.body, method: req.method, timestamp: new Date() });
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error({ timestamp: new Date(), TypeError: error.name, Error: error.message,  });
  res.status(500).json({ message: 'Server Error' });
};


const authenticate = (req, res, next) => {
  try {
    if (req.cookies.email) {
      return next();
    } else {
      throw new ValidationError("Password error", 401);
    }
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const authenticateJWT = (req, res, next) => {
  try {
    const token = req.get('X-auth');
    jwt.verify(token, JWT_CODE, (error, data) => {
      if(error) {
        console.log('data', data)
        console.log('error', error)
        throw new AuthError('Invalid token');
      } else {
        console.log('data', data)
        return next();
      }
    })
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { loggerMiddleware, errorHandler, authenticate, authenticateJWT };
