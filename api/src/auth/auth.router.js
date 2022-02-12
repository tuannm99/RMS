const { validateLogin, validateRegister } = require('./auth.validation');
const { validateResult } = require('../core/utils');
const passport = require('passport');
const authController = require('./auth.controller');

// router
const router = require('express').Router();

router.post('/login', validateLogin(), validateResult, authController.login);
router.post(
  '/register',
  validateRegister(),
  validateResult,
  authController.register
);
router.post('/logout', authController.logout);
router.post('/forgot-pass', authController.forgotPass);
router.post('/refresh-token', authController.refreshToken);

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ msg: 'protected resource' });
  }
);

module.exports = router;
