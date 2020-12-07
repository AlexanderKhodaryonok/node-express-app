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
      Error.captureStackTrace(this, NotFoundError);
      this.name = 'NotFoundError';
      this.statusCode = args[1] || 404;
      this.code = args[2] || 1;
  }
};

class AuthError extends Error {
  constructor(...args) {
      super(...args);
      Error.captureStackTrace(this, AuthError);
      this.name = 'AuthError';
      this.statusCode = args[1] || 401;
      this.code = args[2] || 1;
      this.message = 'You are not authenticated';
  }
};

module.exports = { ValidationError, NotFoundError, AuthError };
