const { ValidationError }  = require("../../../customErrors");

const validatePassword = (req, res, next) => {
  try {
    const password = req.body.password;
    if (!password || password !== PASSWORD) {
      throw new ValidationError("Password error", 401);
    }
    next();
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { validatePassword };
