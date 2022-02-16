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

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAccounts = async (filter, options) => {
  // search contains by username
  filter.username = { $regex: filter.username, $options: 'i' };
  const users = await Account.paginate(filter, options);
  return users;
};

module.exports = {
  createByUsernamePassword,
  getByUsername,
  updateRefreshToken,
  getAccounts,
};
