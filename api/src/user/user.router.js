const express = require('express');

// const { checkAuth } = require('../core/global.middleware');
// const { ROLES } = require('../constants');
const userController = require('./user.controller');

// router
const router = express.Router();

router.get(
  '/',
  // checkAuth(ROLES.admin),
  userController.getAllUsersHandler
);
router.get(
  '/:id',
  // checkAuth(ROLES.admin, ROLES.employee),
  userController.getUserHandler
);
router.put(
  '/:id',
  // checkAuth(ROLES.admin, ROLES.employee),
  userController.updateUserHandler
);
router.delete(
  '/:id',
  // checkAuth(ROLES.admin, ROLES.employee),
  userController.deleteUserHandler
);

// router.get('/users', checkAuth(ROLES.admin, ROLES.employee), userController.getUsersHandler);

module.exports = router;

/**
 * @api {post} /api/v1/users 1. Get All Users
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
 * @apiSuccess {String}   .firstName
 * @apiSuccess {String}   .lastName
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
 *                 "firstName": "van",
 *                 "lastName": "ngo",
 *                 "avatar": "string",
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
