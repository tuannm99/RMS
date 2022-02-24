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
 * @api {post} /api/v1/auth/login 1.Login by username and password
 * @apiName login
 * @apiGroup Auth
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam (Body) {String} username
 * @apiParam (Body) {String} password
 * @apiParamExample (Body) {json} Body-Example:
 *     {
 *       "username": "yourusername",
 *       "password": "mypassword"
 *     }
 *
 * @apisuccess {Object}   user
 * @apiSuccess {String}   user.username
 * @apiSuccess {String}   user.email
 * @apiSuccess {String}   user.role
 * @apisuccess {Date}     user.createdAt
 * @apiSuccess {Date}     user.updatedAt
 * @apiSuccess {String}   user.id
 * @apiSuccess {Object}   tokens
 * @apiSuccess {Object}   tokens.access
 * @apiSuccess {String}   tokens.access.token
 * @apiSuccess {Date}     tokens.access.expires
 * @apiSuccess {Object}   tokens.refresh
 * @apiSuccess {Date}     tokens.refresh.token
 * @apiSuccess {String}   tokens.refresh.expires
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *           "username": "gguest",
 *           "email": "guestle@gmail.com",
 *           "role": "guest",
 *           "createdAt": "2022-02-23T09:06:27.411Z",
 *           "updatedAt": "2022-02-23T09:06:27.411Z",
 *           "id": "6215f913e65816655a1323eb"
 *       },
 *       "tokens": {
 *           "access": {
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1ZjkxM2U2NTgxNjY1NWExMzIzZWIiLCJpYXQiOjE2NDU3MTU1OTIsImV4cCI6MTY0NTcxNTY1MiwidHlwZSI6ImFjY2VzcyJ9.Ie_S0HPDVhCeYkP83y_qugn5X70byhs8MbQF3S5iz_Y",
 *               "expires": "2022-02-24T15:14:12.359Z"
 *           },
 *           "refresh": {
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1ZjkxM2U2NTgxNjY1NWExMzIzZWIiLCJpYXQiOjE2NDU3MTU1OTIsImV4cCI6MTY0NTgwMTk5MiwidHlwZSI6InJlZnJlc2gifQ.w4VqFc3HzVVi1tN3oQK8Tb30gSmckWXRz8PRH5J_vfg",
 *               "expires": "2022-02-25T15:13:12.361Z"
 *           }
 *       }
 *    }
 *
 * @apiError NotFound User not found.
 * @apiError InvalidInput Incorrect username or password
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 400,
 *       "message": "User not found",
 *       "stack": ".......",
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 400,
 *       "message": "User not found",
 *       "stack": ".......",
 *     }
 */

/**
 * @api {post} /api/v1/auth/register 2.Register user
 * @apiName register
 * @apiGroup Auth
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam (Body) {String}   username
 * @apiParam (Body) {String}   password
 * @apiParam (Body) {String}   email
 * @apiParam (Body) {String}   [role]
 * @apiParam (Body) {String}   [firstName]
 * @apiParam (Body) {String}   [lastName]
 * @apiParam (Body) {String}   [avatar]
 * @apiParamExample {json} Body-Example:
 *     {
 *       "username": "yourusername",
 *       "password": "mypassword",
 *       "email": "guestle@gmail.com",
 *       "role": "guest",
 *       "firstName": "caca",
 *       "lastName": "guest",
 *       "avatar": "string",
 *     }
 *
 * @apisuccess {String}   username
 * @apiSuccess {String}   password
 * @apiSuccess {String}   email
 * @apiSuccess {String}   role
 * @apiSuccess {Object}   tokens
 * @apiSuccess {Object}   tokens.access
 * @apiSuccess {String}   tokens.access.token
 * @apiSuccess {Date}     tokens.access.expires
 * @apiSuccess {Object}   tokens.refresh
 * @apiSuccess {Date}     tokens.refresh.token
 * @apiSuccess {String}   tokens.refresh.expires
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *           "username": "gguest",
 *           "email": "guestle@gmail.com",
 *           "role": "guest",
 *           "createdAt": "2022-02-23T09:06:27.411Z",
 *           "updatedAt": "2022-02-23T09:06:27.411Z",
 *           "id": "6215f913e65816655a1323eb"
 *       },
 *       "tokens": {
 *           "access": {
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1ZjkxM2U2NTgxNjY1NWExMzIzZWIiLCJpYXQiOjE2NDU3MTU1OTIsImV4cCI6MTY0NTcxNTY1MiwidHlwZSI6ImFjY2VzcyJ9.Ie_S0HPDVhCeYkP83y_qugn5X70byhs8MbQF3S5iz_Y",
 *               "expires": "2022-02-24T15:14:12.359Z"
 *           },
 *           "refresh": {
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1ZjkxM2U2NTgxNjY1NWExMzIzZWIiLCJpYXQiOjE2NDU3MTU1OTIsImV4cCI6MTY0NTgwMTk5MiwidHlwZSI6InJlZnJlc2gifQ.w4VqFc3HzVVi1tN3oQK8Tb30gSmckWXRz8PRH5J_vfg",
 *               "expires": "2022-02-25T15:13:12.361Z"
 *           }
 *       }
 *    }
 *
 * @apiError NotFound User not found.
 * @apiError InvalidInput Incorrect username or password
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 400,
 *       "message": "User not found",
 *       "stack": ".......",
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 400,
 *       "message": "User not found",
 *       "stack": ".......",
 *     }
 */

/**
 * @api {post} /api/v1/auth/logout 3.logout
 * @apiName logout
 * @apiGroup Auth
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam (Body) {String} refreshToken   This is a refresh token
 * @apiParamExample (Body) {json} Body-Example:
 *     {
 *       "refreshToken": "your_token",
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK {}
 */

/**
 * @api {post} /api/v1/auth/refresh-token 4.Refresh token
 * @apiName refresh token
 * @apiGroup Auth
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam (Body) {String} refreshToken   This is a refresh token
 * @apiParamExample (Body) {json} Body-Example:
 *     {
 *       "refreshToken": "your_token",
 *     }
 *
 * @apisuccess {String}   message
 * @apiSuccess {Object}   tokens
 * @apiSuccess {Object}   tokens.access
 * @apiSuccess {String}   tokens.access.token
 * @apiSuccess {Date}     tokens.access.expires
 * @apiSuccess {Object}   tokens.refresh
 * @apiSuccess {Date}     tokens.refresh.token
 * @apiSuccess {String}   tokens.refresh.expires
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "token updated!",
 *       "tokens": {
 *           "access": {
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1ZjkxM2U2NTgxNjY1NWExMzIzZWIiLCJpYXQiOjE2NDU3MTU1OTIsImV4cCI6MTY0NTcxNTY1MiwidHlwZSI6ImFjY2VzcyJ9.Ie_S0HPDVhCeYkP83y_qugn5X70byhs8MbQF3S5iz_Y",
 *               "expires": "2022-02-24T15:14:12.359Z"
 *           },
 *           "refresh": {
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1ZjkxM2U2NTgxNjY1NWExMzIzZWIiLCJpYXQiOjE2NDU3MTU1OTIsImV4cCI6MTY0NTgwMTk5MiwidHlwZSI6InJlZnJlc2gifQ.w4VqFc3HzVVi1tN3oQK8Tb30gSmckWXRz8PRH5J_vfg",
 *               "expires": "2022-02-25T15:13:12.361Z"
 *           }
 *       }
 *    }
 *
 * @apiError NotFound User not found.
 * @apiError InvalidInput Incorrect username or password
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 400,
 *       "message": "User not found",
 *       "stack": ".......",
 *     }
 */
