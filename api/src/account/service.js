import { Account } from '../core/db/schema/account.js';

const create = async (username, password) => {
  const user = new Account({ username, password });
  return await user.save();
};

const getByUsername = async (username) => {
  return await Account.findOne({ username });
};

const updateRefreshToken = async (username, rtoken) => {
  return await Account.updateOne({ username }, { rtoken: rtoken });
};

export default { create, getByUsername, updateRefreshToken };
