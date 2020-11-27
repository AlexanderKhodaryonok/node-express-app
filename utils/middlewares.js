const logger = require('./logger');

const loggerMiddleware = (req, _res, next) => {
  logger.info({ payload: req.body, method: req.method, timestamp: new Date() });
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error({ timestamp: new Date(), TypeError: error.name, Error: error.message,  });
  res.status(500).json({ message: 'Server Error' });
};

module.exports = { loggerMiddleware, errorHandler };
