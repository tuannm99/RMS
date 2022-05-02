const httpStatus = require('http-status');
const passGenerator = require('generate-password');
const { TokenExpiredError } = require('jsonwebtoken');

const userService = require('../user/user.service');
const tokenService = require('../token/token.service');
const eventProducer = require('../event/producer');
const ApiError = require('../core/apiError');

const { TOKEN_TYPES } = require('../constants');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginByUsernamePassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password');
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
 * forgot pass
 * @param {string} username, email
 */
const forgotPass = async (username, email) => {
  const user = await userService.getUserByUsernameAndEmail(username, email);
  // const newPass = passGenerator.generate({ length: 8, numbers: true });
  await userService.updateUserById(user._id, { password: '123@123abc' });
  eventProducer.sendMailProducer({
    to: email,
    subject: 'Reset password',
    text: `Your new password: 123@123abc`,
  });
};

/**
 * refreshing access token
 * @param {string} refreshToken
 * @returns {Promise} new token
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, TOKEN_TYPES.refresh);
    const user = await userService.getUserById(refreshTokenDoc.userId);
    await refreshTokenDoc.remove();
    return await tokenService.generateAuthTokens(user);
  } catch (error) {
    if (error instanceof TokenExpiredError)
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token Expired');
    else throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

module.exports = { forgotPass, loginByUsernamePassword, logout, refreshAuth };
