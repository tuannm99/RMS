const httpStatus = require('http-status');

const catchAsync = require('../core/catchAsync');
const { pick } = require('../core/utils');

const userService = require('./user.service');

/**
 * get all user
 * @param {string} req
 * @param {string} res
 */
const getAllUsersHandler = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['username', 'rtoken', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.getUsers(filter, options);
  res.status(httpStatus.OK).json(result);
});

/**
 * get one user
 * @param {string} req
 * @param {string} res
 */
const getUserHandler = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(httpStatus.OK).json(user);
});

/**
 * update user
 * @param {string} req
 * @param {string} res
 */
const updateUserHandler = catchAsync(async (req, res) => {
  // TODO: Need impliments
  // const user = await userService.getUserById(req.params.id);
  res.status(httpStatus.OK).json();
});

/**
 * delete user
 * @param {string} req
 * @param {string} res
 */
const deleteUserHandler = catchAsync(async (req, res) => {
  // TODO: Need impliments
  // const user = await userService.getUserById(req.params.id);
  res.status(httpStatus.OK).json();
});

module.exports = { getAllUsersHandler, getUserHandler, updateUserHandler, deleteUserHandler };
