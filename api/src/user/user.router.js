const express = require('express');

const { checkAuth } = require('../core/global.middleware');
const { ROLES } = require('../constants');
const userController = require('./user.controller');

const { upload } = require('../core/multer');

// router
const router = express.Router();

router.get('/', checkAuth(ROLES.admin), userController.getAllUsersHandler);
router.get(
  '/:id',
  checkAuth(ROLES.admin, ROLES.employee, ROLES.hiringManager),
  userController.getUserHandler
);
router.put(
  '/:id',
  checkAuth(ROLES.admin, ROLES.employee, ROLES.hiringManager),
  userController.updateUserHandler
);
router.put(
  '/:id/avatar',
  checkAuth(),
  upload.single('avatar'),
  userController.updateUserAvatarHandler
);
router.delete('/:id', checkAuth(ROLES.admin), userController.deleteUserHandler);

module.exports = router;

/**
 * @api {get} /api/v1/users 1. Get All Users
 * @apiName Get All User
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiQuery {String} [username] search name (match all not contain)
 * @apiQuery {Number} [limit=10] limit the number of return data
 * @apiQuery {Number} [page=1]   choosing page
 * @apiQuery {String} [sortBy="createdAt:asc"] sort by any field of the return collection, Ex:<span> createdAt:asc|createdAt:desc </span>
 *
 * @apisuccess {Array}    results
 * @apiSuccess {String}   .username
 * @apiSuccess {Object}   .name
 * @apiSuccess {String}   .name.firstName
 * @apiSuccess {String}   .name.lastName
 * @apiSuccess {String}   .email
 * @apiSuccess {String}   .role
 * @apisuccess {Date}     .createdAt
 * @apiSuccess {Date}     .updatedAt
 * @apiSuccess {String}   .id
 * @apiSuccess {Object}   tokens
 * @apisuccess {Number}   page
 * @apiSuccess {Number}   limit
 * @apiSuccess {Number}   totalPages
 * @apiSuccess {Number}   totalResults
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "results": [
 *             {
 *                 "username": "vanngo",
 *                 "email": "ngotrongvan1999@gmail.com",
 *                  "name": {
 *                       "firstName": "van",
 *                       "lastName": "ngo",
 *                  }
 *                 "role": "guest",
 *                 "createdAt": "2022-03-02T02:06:53.274Z",
 *                 "updatedAt": "2022-03-02T02:06:53.275Z",
 *                 "id": "621ed13dfa3a15dc62ebce1c"
 *             },
 *             {
 *                 "username": "minhtuan",
 *                 "email": "minhtuan99d@gmail.com",
 *                 "role": "admin",
 *                 "createdAt": "2022-03-02T07:28:43.644Z",
 *                 "updatedAt": "2022-03-02T07:28:43.644Z",
 *                 "id": "621f1cabfa3a15dc62ebce2b"
 *             },
 *             {
 *                 "username": "minhtuan2",
 *                 "email": "minhtuan99ds@gmail.com",
 *                 "role": "employee",
 *                 "createdAt": "2022-03-02T07:28:54.708Z",
 *                 "updatedAt": "2022-03-02T07:28:54.708Z",
 *                 "id": "621f1cb6fa3a15dc62ebce31"
 *             }
 *         ],
 *         "page": 1,
 *         "limit": 10,
 *         "totalPages": 1,
 *         "totalResults": 3
 *     }
 *
 * @apiError NotFound User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 400,
 *       "message": "User not found",
 *       "stack": ".......",
 *     }
 */

/**
 * @api {get} /api/v1/users/:id 2. User detail
 * @apiName User detail
 * @apiGroup User
 * @apiPermission admin, employee
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiQuery {String} [username] search name (match all not contain)
 * @apiQuery {Number} [limit=10] limit the number of return data
 * @apiQuery {Number} [page=1]   choosing page
 * @apiQuery {String} [sortBy="createdAt:asc"] sort by any field of the return collection, Ex:<span> createdAt:asc|createdAt:desc </span>
 *
 * @apiParam (Param) {String} id
 *
 * @apisuccess {Array}    results
 * @apiSuccess {String}   .username
 * @apiSuccess {Object}   .name
 * @apiSuccess {String}   .name.firstName
 * @apiSuccess {String}   .name.lastName
 * @apiSuccess {String}   .avatar
 * @apiSuccess {String}   .email
 * @apiSuccess {String}   .role
 * @apisuccess {Date}     .createdAt
 * @apiSuccess {Date}     .updatedAt
 * @apiSuccess {String}   .id
 * @apiSuccess {Object}   tokens
 * @apisuccess {Number}   page
 * @apiSuccess {Number}   limit
 * @apiSuccess {Number}   totalPages
 * @apiSuccess {Number}   totalResults
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "results": [
 *             {
 *                 "username": "vanngo",
 *                 "email": "ngotrongvan1999@gmail.com",
 *                 "name": {
 *                      "firstName": "caca",
 *                      "lastName": "guest",
 *                 }
 *                 "avatar": "string",
 *                 "role": "guest",
 *                 "createdAt": "2022-03-02T02:06:53.274Z",
 *                 "updatedAt": "2022-03-02T02:06:53.275Z",
 *                 "id": "621ed13dfa3a15dc62ebce1c"
 *             }
 *         ],
 *         "page": 1,
 *         "limit": 10,
 *         "totalPages": 1,
 *         "totalResults": 3
 *     }
 *
 * @apiError NotFound User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 400,
 *       "message": "User not found",
 *       "stack": ".......",
 *     }
 */

/**
 * @api {put} /api/v1/users/:id 3. Edit user by id
 * @apiName edit user by id
 * @apiGroup User
 * @apiPermission admin, employee
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiParam (Param) {String} id   An user id
 *
 * @apiParam (Body) {String} email
 * @apiParam (Body) {String} firstName
 * @apiParam (Body) {String} lastName
 * @apiParamExample (Body) {json} Body-Example:
 *    {
 *        "email": "vannthe1301642@fpt.edu.vn",
 *        "firstName": "van",
 *        "lastName": "ngo",
 *        ...
 *    }
 *
 * @apiSuccess {String}     username
 * @apiSuccess {String}     email
 * @apiSuccess {String}     firstName
 * @apisuccess {String}     lastName
 * @apiSuccess {String}     avatar
 * @apiSuccess {String}     role
 * @apiSuccess {Date}       createdAt
 * @apiSuccess {Date}       updatedAt
 * @apiSuccess {String}     id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "username": "vanngo1",
 *          "email": "vannthe1301642@fpt.edu.vn",
 *          "firstName": "van",
 *          "lastName": "ngo",
 *          "avatar": "string",
 *          "role": "admin",
 *          "createdAt": "2022-03-02T07:44:24.761Z",
 *          "updatedAt": "2022-03-02T07:44:24.761Z",
 *          "id": "621f2058fa3a15dc62ebce4d"
 *      }
 **
 * @apiError NotFound User not found
 * @apiError NotFound User not found
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
 * @api {put} /api/v1/users/:id/avatar 4. Edit user avatar by id
 * @apiName edit user avatar
 * @apiGroup User
 * @apiPermission admin, employee
 *
 * @apiHeader {String} Content-Type multipart/form-data
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiParam (Param) {String} id   An user id
 *
 * @apiParam (Form) {File} avatar  Send image
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 *
 * @apiError NotFound User not found
 * @apiError NotFound User not found
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
 * @api {delete} /api/v1/user/:id 5. Delete user by id
 * @apiName delete user by id
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiParam (Param) {String} id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError NotFound User not found.
 * @apiError NotFound User not found.
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
