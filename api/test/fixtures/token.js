const moment = require('moment');
const tokenService = require('../../src/token/token.service');
const USERS = require('./users');

const accessTokenExpires = moment().add('20', 'minutes');
const adminToken = tokenService.generateToken(USERS[0]._id, accessTokenExpires, 'access');
const hmToken = tokenService.generateToken(USERS[1]._id, accessTokenExpires, 'access');

module.exports = {
  adminToken,
  hmToken,
};
