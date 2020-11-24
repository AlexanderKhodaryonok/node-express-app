const { createLogger, format, transports } = require('winston');
const { printf, combine, json } = format;

const myFormat = printf((params) => {
  return params.message;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    myFormat,
  ),
  transports: [
    new transports.File({
      filename: 'logs/combined.log',
      level: 'info',
      format: json(),
    }),
    new transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      format: json(),
    }),
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    level: 'debug',
    format: json(),
  }));
}

module.exports = logger;
