// why it didn't work?

// const baseError = (message, statusCode) => {
//   const error = new Error();
//   error.message = message;
//   error.name = 'baseError';
//   error.statusCode =  statusCode;
//   error.stack =  (new Error()).stack;
//   return { ...error };
// };

class ValidationError extends Error {
  constructor(...args) {
      super(...args);
      Error.captureStackTrace(this, ValidationError);
      this.name = 'ValidationError';
      this.statusCode = args[1] || 500;
      this.code = args[2] || 1;
  }
};

class NotFoundError extends Error {
  constructor(...args) {
      super(...args);
      Error.captureStackTrace(this, ValidationError);
      this.name = 'NotFoundError';
      this.statusCode = args[1] || 404;
      this.code = args[2] || 1;
  }
};
module.exports = { ValidationError, NotFoundError };
