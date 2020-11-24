const express = require("express");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { PORT } = require("./config");
const logger = require("./utils/logger");

const port = PORT || 3000;

const app = express();

app.use(express.json());

app.use( (req, _res, next) => {
  logger.info({payload: req.body, method: req.method, timestamp: new Date()});
  next();
});

app.use("/users", userRoutes);
app.use("/login", authRoutes);

app.listen(port, () => {
  console.log(`Server API was started! Reserved port is ${port}`);
});

module.exports = app;
