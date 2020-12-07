const express = require("express");
const { AuthError } = require("../../customErrors");

const router = express.Router();

router.get("/", (req, res) => {
  const { name } = req.query;

  req.session.user = { name };

  res.setHeader("content-type", "text/html");
  res.status(200).send(`
      <form action="/auth/login">
        <div>Login</div>
        <input name="email" type="text"></input>
        <input name="password" type="text"></input>
        <button type='submit'>Login</button>
      </form>
  `);
});

router.get("/auth/login", (req, res) => {
  try {
    const { email, password } = req.query;
    console.log(email, password);
    if (!password || !email) {
      throw new AuthError()
    }
    if (password === process.env.PASSWORD) {
      res.cookie("email", email);
      res.status(200).send(`
        <div>Hello</div>
      `);
    }
  } catch (error) {
    res.status(error.statusCode).json(error.message);
  }
});

module.exports = router;
