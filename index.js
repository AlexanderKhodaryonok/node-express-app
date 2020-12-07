const express = require("express");
const session = require('express-session');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { PORT } = require("./config");
const { loggerMiddleware, errorHandler, SESSION_OPTIONS } = require("./utils");
const { NotFoundError }  = require("./customErrors");

const app = express();

app.use(session(SESSION_OPTIONS));
app.use(express.json());
app.use(loggerMiddleware);

app.use("/users", userRoutes);
app.use("/", authRoutes);

app.use([errorHandler]);

app.use('*', ({ method, baseUrl}, res, next) => {
  try {
    throw new NotFoundError(`End-point not found, method: ${method}, pathname: ${baseUrl}`, 404)
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  };
});

const port = PORT || 3000;

app.listen(port, () => {
  console.log(`Server API was started! Reserved port is ${port}`);
});

module.exports = app;
