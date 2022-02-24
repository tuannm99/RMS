const express = require('express');
const { validateLogin, validateRegister } = require('./auth.validation');
const { checkAuth } = require('../core/global.middleware');
const { ROLES } = require('../constants');

const authController = require('./auth.controller');

// router
const router = express.Router();

router.post('/login', validateLogin(), authController.loginHandler);
router.post('/register', validateRegister(), authController.registerHandler);
router.post('/logout', authController.logoutHandler);
router.post('/forgot-pass', authController.forgotPassHandler);
router.post('/refresh-token', authController.refreshTokenHandler);

router.get('/protected', checkAuth(), (req, res) => {
  res.json('protected resource');
});
router.get(
  '/get-accounts',
  checkAuth(ROLES.admin, ROLES.employee),
  authController.getAccountHandler
);

module.exports = router;

/**
 * @api {post} /api/v1/auth/login Login by username and password
 * @apiName login
 * @apiGroup Auth
 *
 * @apiBody {String} username Username of the User.
 * @apiBody {String} password Password of the User.
 *
 * @apiParamExample {json} Body:
 *     {
 *       "username": "yourusername",
 *       "password": "mypassword"
 *     }
 *
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
