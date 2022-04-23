const httpStatus = require('http-status');

const catchAsync = require('../core/catchAsync');
const { pick, utf8ToASCII, removeSpace } = require('../core/utils');

const userService = require('./user.service');
const ApiError = require('../core/apiError');

/**
 * create user
 * @param {string} req
 * @param {string} res
 */
const createUserHandler = catchAsync(async (req, res) => {
  const result = await userService.createUser({
    ...req.body,
    unsignedFullName: utf8ToASCII(req.body.fullName),
    fullName: removeSpace(req.body.fullName),
    firstName: removeSpace(req.body.firstName),
    lastName: removeSpace(req.body.lastName),
    middleName: removeSpace(req.body.middleName),
  });
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
  filter.fullName = removeSpace(filter.fullName);
  filter.unsignedFullName = utf8ToASCII(filter.fullName);
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
  const user = await userService.updateUserById(req.params.id, {
    ...req.body,
    unsignedFullName: utf8ToASCII(req.body.fullName),
    fullName: removeSpace(req.body.fullName),
    firstName: removeSpace(req.body.firstName),
    lastName: removeSpace(req.body.lastName),
    middleName: removeSpace(req.body.middleName),
  });
  res.status(httpStatus.OK).json(user);
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
 * change password
 * @param {string} req
 * @param {string} res
 */
const changePasswordHandler = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!(await user.isPasswordMatch(req.body.oldPassword))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Your old password not match!');
  }

  await userService.updateUserById(req.params.id, { password: req.body.newPassword });
  res.status(httpStatus.OK).json({ msg: 'password updated!' });
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
  changePasswordHandler,
  updateUserAvatarHandler,
};
