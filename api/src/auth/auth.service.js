const accountService = require('../account/account.service');
const envConf = require('../core/config');
const jwt = require('jsonwebtoken');
const ApiError = require('../core/apiError');
const httpStatus = require('http-status');

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

const verifyRefreshToken = async (rtoken) => {
  return jwt.verify(rtoken, envConf.refresh_token, (err, decoded) => {
    // check error
    if (err) {
      throw new ApiError(httpStatus.UNAUTHORIZED, err);
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

const loginByUsernamePassword = async (username, password) => {
  const user = await accountService.getByUsername(username);

  if (user.password === password) {
    // from now on we’ll identify the user by the id and the id is
    // the only personalized value that goes into our token
    const payload = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };
    const token = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    // update refresh token

    await accountService.updateRefreshToken(username, refreshToken);
    return {
      token: token,
      refreshToken: refreshToken,
      user_id: user._id,
      msg: 'login successful!',
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'password is incorrect');
  }
};

module.exports = { loginByUsernamePassword, verifyRefreshToken };
