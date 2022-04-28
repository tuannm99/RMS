const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../core/config');

const { Token } = require('../core/db/schema');
const { TOKEN_TYPES } = require('../constants');
const ApiError = require('../core/apiError');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    userId: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  }
  return tokenDoc;
};

/**
 * Delete refresh tokens
 * @param {User} refreshToken
 */
const deleteByRefreshToken = async (refreshToken) => {
  const tokenDoc = await Token.findOneAndDelete({
    token: refreshToken,
  });
  if (!tokenDoc) throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(1, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, TOKEN_TYPES.access);

  // const refreshTokenExpires = moment().add(1, 'hours');
  const refreshTokenExpires = moment().add(5, 'minutes');
  const refreshToken = generateToken(user.id, refreshTokenExpires, TOKEN_TYPES.refresh);

  await saveToken(refreshToken, user.id, refreshTokenExpires, TOKEN_TYPES.refresh);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
// const generateResetPasswordToken = async (email) => {
// const user = await userService.getUserByEmail(email);
// if (!user) {
// throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
// }
// const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
// const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
// await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
// return resetPasswordToken;
// };

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
// const generateVerifyEmailToken = async (user) => {
// const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
// const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
// await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
// return verifyEmailToken;
// };

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  deleteByRefreshToken,
  // generateResetPasswordToken,
  // generateVerifyEmailToken,
};
