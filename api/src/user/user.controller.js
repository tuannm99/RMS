const httpStatus = require('http-status');
const fs = require('fs');

const catchAsync = require('../core/catchAsync');
const { pick } = require('../core/utils');

const userService = require('./user.service');

/**
 * create user
 * @param {string} req
 * @param {string} res
 */
const createUserHandler = catchAsync(async (req, res) => {
  const result = await userService.createUser();
  res.status(httpStatus.OK).json(result);
});

/**
 * get all user
 * @param {string} req
 * @param {string} res
 */
const getAllUsersHandler = catchAsync(async (req, res) => {
  // TODO: Need refactor
  const filter = pick(req.query, ['fullName', 'role']);
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
  await userService.updateUserById(req.params.id, req.body);
  res.status(httpStatus.OK).json();
});

/**
 * update user avatar
 * @param {string} req
 * @param {string} res
 */
const updateUserAvatarHandler = catchAsync(async (req, res) => {
  // const fileUploaded = fs.readFileSync(req.file.path).toString('base64');
  // const image = Buffer.from(fileUploaded, 'base64');
  // const avatar = req.file;
  // avatar.imageBuffer = image;
  await userService.updateUserAvatarById(req.params.id, req.file);
  res.status(httpStatus.OK).json(req.file);
});

/**
 * delete user
 * @param {string} req
 * @param {string} res
 */
const deleteUserHandler = catchAsync(async (req, res) => {
  const user = await userService.deleteUserById(req.params.id);
  res.status(httpStatus.OK).json(user);
});

module.exports = {
  createUserHandler,
  getAllUsersHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  updateUserAvatarHandler,
};
