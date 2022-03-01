const router = require('express').Router();
const jobController = require('./job.controller');

router.get('/', jobController.getAllJob);
router.get('/:id', jobController.getJob);
router.post('/', jobController.addJobPosting);
router.put('/:id', jobController.editJobPosting);
router.delete('/:id', jobController.deleteJobPosting);

module.exports = router;

/**
 * @api {get} /api/v1/jobs 1.Get all job form list job
 * @apiName get all job
 * @apiGroup Job
 *
 * @apiHeader {String} Content-Type application/json
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
