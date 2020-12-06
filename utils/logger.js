const { createLogger, format, transports } = require('winston');
const { printf, combine, json, colorize, simple } = format;

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.File({
      filename: 'logs/combined.log',
      level: 'info',
    }),
    new transports.File({
      filename: 'logs/errors.log',
      level: 'error',
    }),
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    level: 'debug',
    format: combine(
      colorize({ all: true }),
      simple(),
    ),
  }));
}

if (process.env.NODE_ENV === 'test') {
  const errorsLogger = logger.transports.find(transport => {
    return transport.level === 'error'
  });
  
  logger.remove(errorsLogger);
}

module.exports = logger;
