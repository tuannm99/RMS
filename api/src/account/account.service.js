const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const Account = require('../core/db/schema/account');

// TODO: nead refactor
const createByUsernamePassword = async (username, password) => {
  const user = new Account({ username, password });
  try {
    return await user.save();
  } catch (e) {
    throw e;
  }
};

const getByUsername = async (username) => {
  const account = await Account.findOne({ username });
  if (!account) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such user found');
  }
  return account;
};

const updateRefreshToken = async (username, rtoken) => {
  try {
    return await Account.updateOne({ username }, { rtoken: rtoken });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createByUsernamePassword,
  getByUsername,
  updateRefreshToken,
};
