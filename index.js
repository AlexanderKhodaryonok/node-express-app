const express = require("express");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { PORT } = require("./config");
const { loggerMiddleware, errorHandler } = require("./utils/middlewares");
const { NotFoundError }  = require("./customErrors");

const port = PORT || 3000;

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/users", userRoutes);
app.use("/login", authRoutes);

app.use([errorHandler]);

app.use('*', ({ method, baseUrl}, res, next) => {
  try {
    throw new NotFoundError(`End-point not found, method: ${method}, pathname: ${baseUrl}`, 404)
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  };
});

app.listen(port, () => {
  console.log(`Server API was started! Reserved port is ${port}`);
});

module.exports = app;
