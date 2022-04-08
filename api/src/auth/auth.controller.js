const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const authService = require('./auth.service');
const tokenService = require('../token/token.service');
const userService = require('../user/user.service');

/**
 * middleware handler register
 * @param {string} req
 * @param {string} res
 */
const registerHandler = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).json({ user, tokens });
});

/**
 * middleware handler login
 * @param {string} req
 * @param {string} res
 */
const loginHandler = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginByUsernamePassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).json({ user, tokens });
});

/**
 * middleware handler logout
 * @param {string} req
 * @param {string} res
 */
const logoutHandler = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.OK).json();
});

// eslint-disable-next-line no-unused-vars
const forgotPassHandler = catchAsync(async (req, res) => {
  await authService.forgotPass(req.query.email);
  res.status(httpStatus.OK).json({ msg: 'success, check email!' });
});

/**
 * middleware handler refresh token
 * @param {string} req
 * @param {string} res
 */
const refreshTokenHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  // get new access Token
  const newToken = await authService.refreshAuth(refreshToken);
  res.status(httpStatus.OK).json({ msg: 'token updated', newToken });
});

module.exports = {
  logoutHandler,
  loginHandler,
  registerHandler,
  forgotPassHandler,
  refreshTokenHandler,
};
