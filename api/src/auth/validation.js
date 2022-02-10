const { body } = require('express-validator');

exports.validateLogin = () => {
  return [
    body('username', 'username must be have at least 4 character')
      .notEmpty()
      .isLength({
        min: 4,
      }),
    body('password').isLength({ min: 5 }).notEmpty(),
  ];
};

exports.validateRegister = () => {
  return [
    body('username').notEmpty(),
    body('password', 'password must be have at least 5 character')
      .notEmpty()
      .isLength({
        min: 5,
      }),
  ];
};
