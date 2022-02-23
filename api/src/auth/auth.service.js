const httpStatus = require('http-status');

const userService = require('../user/user.service');
const tokenService = require('../token/token.service');
const ApiError = require('../core/apiError');

const { tokenTypes } = require('../constants');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginByUsernamePassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 */
const logout = async (refreshToken) => {
  // remove refresh token
  await tokenService.deleteByRefreshToken(refreshToken);
};

/**
 * refreshing access token
 * @param {string} refreshToken
 * @returns {Promise} new token
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.userId);
    await refreshTokenDoc.remove();
    return await tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

module.exports = { loginByUsernamePassword, logout, refreshAuth };
