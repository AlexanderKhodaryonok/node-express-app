const express = require("express");
const userRoutes = require("./routes/users");
const { PORT } = require("./config");

const port = PORT || 3000;

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server API was started! Reserved port is ${port}`);
});

module.exports = app;
