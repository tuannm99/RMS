const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const catchAsync = require('../core/catchAsync');
const { pick } = require('../core/utils');

const authService = require('./auth.service');
const tokenService = require('../token/token.service');
const userService = require('../user/user.service');

// Done
const registerHandler = catchAsync(async (req, res) => {
  const user = await userService.createAccount(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).json({ user, tokens });
});

// Done
const loginHandler = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginByUsernamePassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).json({ user, tokens });
});

// Done
const logoutHandler = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.OK).json();
});

const forgotPassHandler = catchAsync(async (req, res) => {
  // TODO: need implimentation
});

// Done
const refreshTokenHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  // get new access Token
  const newToken = await authService.refreshAuth(refreshToken);
  res.status(httpStatus.OK).json({ msg: 'token updated', newToken });
});

/*
 * pagination demo
 *
 */
const getAccountHandler = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['username', 'rtoken', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.getAccounts(filter, options);
  res.status(httpStatus.OK).json(result);
});

module.exports = {
  logoutHandler,
  loginHandler,
  registerHandler,
  forgotPassHandler,
  refreshTokenHandler,
  getAccountHandler,
};
