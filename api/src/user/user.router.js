const express = require('express');

const { checkAuth } = require('../core/global.middleware');
const { ROLES } = require('../constants');
const userController = require('./user.controller');

const { upload } = require('../core/multer');

// router
const router = express.Router();

router.get('/', checkAuth(), userController.getAllUsersHandler);
router.get('/:id', checkAuth(), userController.getUserHandler);
router.put('/:id', checkAuth(), userController.updateUserHandler);
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
 *          "results": [
 *              {
 *                  "jobStatus": {
 *                      "employeeId": "EPL3",
 *                      "dateOfJoining": "2022-03-11T09:26:47.812Z"
 *                  },
 *                  "username": "admin123456666",
 *                  "email": "admin1234567@gmail.com",
 *                  "firstName": "Pham",
 *                  "lastName": "Tuan",
 *                  "middleName": "Son",
 *                  "phone": 368641111,
 *                  "fullName": "Pham Tuan Son",
 *                  "dateOfBirth": null,
 *                  "languages": "",
 *                  "matefialStatus": "",
 *                  "role": "employee",
 *                  "createdAt": "2022-03-11T09:26:47.813Z",
 *                  "updatedAt": "2022-03-11T09:26:47.813Z",
 *                  "id": "622b15d7df70aeb1b2e079ee"
 *              },
 *              {
 *                  "jobStatus": {
 *                      "employeeId": "EPL4",
 *                      "dateOfJoining": "2022-03-11T09:38:07.232Z"
 *                  },
 *                  "username": "admin123",
 *                  "email": "admin123@gmail.com",
 *                  "firstName": "Pham",
 *                  "lastName": "Tuan",
 *                  "middleName": "Son",
 *                  "phone": 368641111,
 *                  "fullName": "Pham Tuan Son",
 *                  "dateOfBirth": null,
 *                  "languages": "",
 *                  "matefialStatus": "",
 *                  "role": "admin",
 *                  "createdAt": "2022-03-11T09:38:07.232Z",
 *                  "updatedAt": "2022-03-11T09:38:07.232Z",
 *                  "id": "622b187fdf70aeb1b2e07a1b"
 *              },
 *              {
 *                  "jobStatus": {
 *                      "employeeId": "EPL5",
 *                      "dateOfJoining": "2022-03-11T17:00:19.533Z"
 *                  },
 *                  "username": "hm12345",
 *                  "email": "admin12345@gmail.com",
 *                  "firstName": "Pham",
 *                  "lastName": "Tuan",
 *                  "middleName": "Son",
 *                  "phone": 368641111,
 *                  "fullName": "Pham Tuan Son",
 *                  "dateOfBirth": null,
 *                  "languages": "",
 *                  "matefialStatus": "",
 *                  "role": "hiringManager",
 *                  "createdAt": "2022-03-11T17:00:19.533Z",
 *                  "updatedAt": "2022-03-11T17:00:19.533Z",
 *                  "id": "622b802354aef25d31c389f2"
 *              }
 *          ],
 *          "page": 1,
 *          "limit": 10,
 *          "totalPages": 1,
 *          "totalResults": 3
 *      }
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
 *          "jobStatus": {
 *              "employeeId": "EPL4",
 *              "dateOfJoining": "2022-03-11T09:38:07.232Z"
 *          },
 *          "username": "admin123",
 *          "email": "admin123@gmail.com",
 *          "firstName": "Pham",
 *          "lastName": "Tuan",
 *          "middleName": "Son",
 *          "phone": 368641111,
 *          "fullName": "Pham Tuan Son",
 *          "dateOfBirth": null,
 *          "languages": "",
 *          "matefialStatus": "",
 *          "role": "admin",
 *          "createdAt": "2022-03-11T09:38:07.232Z",
 *          "updatedAt": "2022-03-11T09:38:07.232Z",
 *          "id": "622b187fdf70aeb1b2e07a1b"
 *      }
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
 *          "username": "hm12345",
 *          "password": "123@123ab",
 *          "email": "admin12345@gmail.com",
 *          "firstName": "Pham",
 *          "lastName": "Tuan",
 *          "middleName": "Son",
 *          "phone": "0368641111",
 *          "fullName": "Pham Tuan Son",
 *          "dateOfBirth": "",
 *          "languages": "",
 *          "matefialStatus": "",
 *          "avatar": "",
 *          "role": "hiringManager",
 *          "jobStatus": {
 *              "employeeStatus": "",
 *              "employeeType": "",
 *              "dateOfJoining": "",
 *              "department": "",
 *              "primaryTeam": "",
 *              "level": ""
 *          }
 *      }
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
    "user": {
        "username": "hm1234511",
        "email": "admin1234511@gmail.com",
        "firstName": "Pham",
        "lastName": "Tuan",
        "middleName": "Son",
        "phone": 368641111,
        "fullName": "Pham Tuan Son",
        "dateOfBirth": null,
        "languages": "",
        "role": "hiringManager",
        "jobStatus": {
            "employeeId": "EPL6",
            "dateOfJoining": "2022-03-14T09:20:27.829Z"
        },
        "createdAt": "2022-03-14T09:20:27.830Z",
        "updatedAt": "2022-03-14T09:20:27.830Z",
        "id": "622f08db517eb505c2d5b687"
    }
}
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
