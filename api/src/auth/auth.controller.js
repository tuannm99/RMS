const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const catchAsync = require('../core/catchAsync');

const accountService = require('../account/account.service');
const authService = require('./auth.service');

const registerHandler = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const a = await accountService.createByUsernamePassword(username, password);
  res.status(httpStatus.OK).json({ account: a, msg: 'user created!' });
});

const loginHandler = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const userPayload = await authService.loginByUsernamePassword(
    username,
    password
  );
  res.status(httpStatus.OK).json(userPayload);
});

const logoutHandler = catchAsync(async (req, res) => {
  const { username } = req.body;
  // remove refreshToken
  await accountService.updateRefreshToken(username, null);
  res.status(httpStatus.OK).json({ msg: 'logout successful!' });
});

const forgotPassHandler = catchAsync(async (req, res) => {
  // TODO: need implimentation
});

const refreshTokenHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  // verify refreshToken
  const newToken = await authService.verifyRefreshToken(refreshToken);
  res.status(httpStatus.OK).json({ msg: 'token updated', newToken });
});

module.exports = {
  logoutHandler,
  loginHandler,
  registerHandler,
  forgotPassHandler,
  refreshTokenHandler,
};
