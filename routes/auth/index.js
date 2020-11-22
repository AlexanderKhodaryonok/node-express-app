const express = require("express");
const { PASSWORD } = require("../../config");

const router = express.Router();

router.use((req, res, next) => {
  try {
    const password = req.body.password;
    if (password && password !== PASSWORD) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", (_req, res) => {
  try {
    res.json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
