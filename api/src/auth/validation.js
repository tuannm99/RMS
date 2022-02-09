import { body } from 'express-validator';

export const validateLogin = () => {
  return [
    body('username', 'usernamme must be at least 4 character').isLength({
      min: 4,
    }),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
  ];
};

export const validateRegister = () => {
  return [body('username'), body('password').isLength({ min: 5 })];
};
