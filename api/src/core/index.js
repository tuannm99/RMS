const validationResult = require('express-validator');
const jwt = require('jsonwebtoken');
const envConf = require('./config');

const createAccessToken = (payload) => {
  return jwt.sign(payload, envConf.access_token, {
    expiresIn: 60, // 60 seconds
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, envConf.refresh_token, {
    expiresIn: 60 * 60 * 24, // one day
  });
};

const verifyRefreshToken = (rtoken) => {
  return jwt.verify(rtoken, envConf.refresh_token, (err, decoded) => {
    // check error
    if (err) {
      throw err;
    }
    // get payload
    const payload = {
      _id: decoded._id,
      username: decoded.username,
      role: decoded.role,
    };
    return createAccessToken(payload);
  });
};

const validateResult = (req, res) => {
  //const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return errors;
  }
};

const hashPassword = () => {};
const unhashPassword = () => {};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  validationResult,
  hashPassword,
  unhashPassword,
};
