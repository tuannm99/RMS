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

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
