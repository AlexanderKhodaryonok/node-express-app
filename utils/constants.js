const SESSION_OPTIONS = {
  key: 'key',
  secret: 'pa$$w0rd',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  },
};

const JWT_CODE = 'code';

const JWT_SIGN_OPTIONS = { expiresIn: '30m' };

const JWT_VERIFY_OPTIONS = { ignoreExpiration: false };

module.exports = { SESSION_OPTIONS, JWT_CODE, JWT_SIGN_OPTIONS, JWT_VERIFY_OPTIONS, };
