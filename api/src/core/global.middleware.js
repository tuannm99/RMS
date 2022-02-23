const passport = require('passport');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const config = require('./config');
const logger = require('./logger');

const ApiError = require('./apiError');
const { ROLES } = require('../constants');

// middleware convert error to ApiError
const errorConverter = (err, req, res, next) => {
  logger.info('error converter');
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
// middleware to handle error and send error formated request
const errorHandler = (err, req, res, next) => {
  logger.info('error handler');
  let { statusCode, message } = err;
  if (config.node_env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.node_env === 'development' && { stack: err.stack }),
  };

  if (config.node_env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

// handling authenticate/authorization
const _verifyCallback = (req, resolve, reject, requiredRoles) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  console.log(user);
  console.log(requiredRoles);

  if (requiredRoles.length && !requiredRoles.includes(user.role)) {
    return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  }

  resolve();
};

// middleware using passport-jwt to authenticate
const checkAuth =
  (...requiredRoles) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        _verifyCallback(req, resolve, reject, requiredRoles)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = {
  errorConverter,
  errorHandler,
  checkAuth,
};
