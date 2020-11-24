const logger = require('./logger');

const loggerMiddleware = (req, _res, next) => {
  try {
    logger.info({ payload: req.body, method: req.method, timestamp: new Date() });
    next();
  } catch {
    logger.error({ payload: req.body, method: req.method, timestamp: new Date() });
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = loggerMiddleware;
