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

module.exports = { SESSION_OPTIONS };
