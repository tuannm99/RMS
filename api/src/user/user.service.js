const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const ApiError = require('../core/apiError');
const config = require('../core/config');
const { User } = require('../core/db/schema');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isUsernameTaken(userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Get user by username
 * @param {string} username
 * @returns {Promise<User>}
 */
const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  return user;
};

/**
 * Get Id from token
 * @param {string} authorization
 * @returns {Promise<string>} userId
 */
const getUserIdFromHeaderToken = async (authorization) => {
  // remove "Bearer "
  const token = authorization.substring(7, authorization.length);
  const payload = jwt.verify(token, config.jwt.secret);
  return payload.sub;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getUsers = async (filter, options) => {
  filter.fullName = { $regex: `${filter.fullName ? filter.fullName : ''}`, $options: 'i' };
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  user.name = { firstName: user.firstName, lastName: user.lastName };
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user avatar by id
 * @param {ObjectId} userId
 * @param {Object} avatar
 * @returns {Promise<User>}
 */
const updateUserAvatarById = async (userId, avatar) => {
  const user = await getUserById(userId);
  Object.assign(user, { avatar });
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  deleteUserById,
  updateUserById,
  updateUserAvatarById,
  getUsers,
  getUserById,
  getUserByUsername,
  getUserIdFromHeaderToken,
};
