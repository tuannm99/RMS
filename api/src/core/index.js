const { validationResult } = require('express-validator');
const { validateResult } = require('express-validator');
const envConf = require('./config');
const jwt = require('jsonwebtoken');

exports.createAccessToken = (payload) => {
  return jwt.sign(payload, envConf.access_token, {
    expiresIn: 60, // 60 seconds
  });
};

exports.createRefreshToken = (payload) => {
  return jwt.sign(payload, envConf.refresh_token, {
    expiresIn: 60 * 60 * 24, // one day
  });
};

exports.verifyRefreshToken = (rtoken) => {
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

exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return errors;
  }
  next();
};

const hashPassword = () => {};
const unhashPassword = () => {};
