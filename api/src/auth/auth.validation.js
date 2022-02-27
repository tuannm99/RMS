const { body } = require('express-validator');
const { validateResult } = require('../core/utils');

exports.validateLogin = () => {
  return [
    body('username', 'username must be have at least 6 character').notEmpty().isLength({
      min: 6,
    }),
    body('password').isLength({ min: 5 }).notEmpty(),
    validateResult,
  ];
};

exports.validateRegister = () => {
  return [
    body('username').notEmpty(),
    body('password', 'password must be have at least 5 character').notEmpty().isLength({
      min: 5,
    }),
    validateResult,
  ];
};
