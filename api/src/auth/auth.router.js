const { validateLogin, validateRegister } = require('./auth.validation');
const passport = require('passport');
const authController = require('./auth.controller');

// router
const router = require('express').Router();

router.post('/login', validateLogin(), authController.loginHandler);
router.post('/register', validateRegister(), authController.registerHandler);
router.post('/logout', authController.logoutHandler);
router.post('/forgot-pass', authController.forgotPassHandler);
router.post('/refresh-token', authController.refreshTokenHandler);

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json('protected resource');
  }
);
router.get('/get-accounts', authController.getAccountHandler);

module.exports = router;
