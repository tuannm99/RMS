const Account = require('../core/db/schema/account');

const createByUsernamePassword = async (username, password) => {
  const user = new Account({ username, password });
  return await user.save();
};

const getByUsername = async (username) => {
  return await Account.findOne({ username });
};

const updateRefreshToken = async (username, rtoken) => {
  return await Account.updateOne({ username }, { rtoken: rtoken });
};

module.exports = {
  createByUsernamePassword,
  getByUsername,
  updateRefreshToken,
};
