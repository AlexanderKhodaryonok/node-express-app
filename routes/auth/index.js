const express = require("express");
const { PASSWORD } = require("../../config");
const { validatePassword }  = require("./middlewares");

const router = express.Router();

router.use(([validatePassword]));

router.post("/", (_req, res) => {
  try {
    res.json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
