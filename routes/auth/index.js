const express = require("express");
const jwt = require('jsonwebtoken');
const { JWT_CODE, JWT_SIGN_OPTIONS, } = require('../../utils');
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
    if (!password.trim() || !email.trim()) {
      throw new AuthError("Email or password is null");
    }
    if (password === process.env.PASSWORD) {
      res.cookie("email", email);
      res.status(200).send(`
        <div>Hello</div>
      `);
    } else {
      throw new AuthError("Invalid email or password");
    }
  } catch (error) {
    res.status(error.statusCode).json(error.message);
  }
});

router.get("/jwt", (req, res) => {
  const { name } = req.query;

  req.session.user = { name };

  res.setHeader("content-type", "text/html");
  res.status(200).send(`
      <form action="/jwt/auth/login">
        <div>Login</div>
        <input name="email" type="text"></input>
        <input name="password" type="text"></input>
        <button type='submit'>Login</button>
      </form>
  `);
});

router.post("/jwt/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      throw new AuthError("Email or password is null");
    }
    if (password === process.env.PASSWORD) {
      const token = jwt.sign({ id: 'id', name: 'Grigorii', role: 'QA(petushara)' }, JWT_CODE, JWT_SIGN_OPTIONS);
      res.status(201).json({ access_token: token, expired_at: Date.now() + 1000 * 60 * 30 });
    } else {
      throw new AuthError("Invalid email or password");
    }
  } catch (error) {
    console.log('error', error)
    res.status(error.statusCode).json(error.message);
  }
});

router.post("/jwt/refresh", (req, res) => {
  try {
    const token = req.get('X-auth');
    jwt.verify(token, JWT_CODE, (error, data) => {
      if(error) {
        console.log('data', data)
        console.log('error', error)
        throw new AuthError('Invalid token');
      } else {
        const token = jwt.sign({ id: 'id', name: 'Grigorii', role: 'QA(petushara)' }, JWT_CODE, JWT_SIGN_OPTIONS);
        res.status(201).json({ access_token: token, expired_at: Date.now() + 1000 * 60 * 30 });
      }
    })
  } catch (error) {
    console.log('error', error)
    res.status(error.statusCode).json(error.message);
  }
});

module.exports = router;
