const router = require('express').Router();

const { checkAuth } = require('../core/global.middleware');
const { ROLES } = require('../constants');
const jobController = require('./job.controller');

router.get('/', checkAuth(), jobController.getAllJob);
router.get('/:id', checkAuth(), jobController.getJob);
router.post('/', checkAuth(ROLES.hiringManager), jobController.addJobPosting);
router.put('/:id', checkAuth(ROLES.hiringManager), jobController.editJobPosting);
router.delete('/:id', checkAuth(ROLES.hiringManager), jobController.deleteJobPosting);

module.exports = router;

/**
 * @api {post} /api/v1/jobs 1. Add job
 * @apiName add job
 * @apiGroup Job
 * @apiPermission hiringManager
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiParam (Body) {String} title
 * @apiParam (Body) {String} department
 * @apiParam (Body) {String} jobType
 * @apiParam (Body) {String} location
 * @apiParam (Body) {String} jobDescription
 * @apiParam (Body) {String} skill
 * @apiParam (Body) {Number} minSalary
 * @apiParam (Body) {Number} maxSalary
 * @apiParam (Body) {String} currency
 * @apiParamExample (Body) {json} Body-Example:
 *     {
 *        "title":"can tuyen nguoi 123",
 *        "department":"part time + full time",
 *        "jobType":"full Time",
 *        "location": "Ha Noi",
 *        "jobDescription":"job very good",
 *        "skill":"nodejs",
 *        "minSalary": "1000",
 *        "maxSalary": "1500",
 *        "currency": "USD"
 *     }
 *
 * @apiSuccess {String}     title
 * @apiSuccess {String}     department
 * @apiSuccess {String}     jobType
 * @apisuccess {String}     location
 * @apiSuccess {String}     jobDescription
 * @apiSuccess {String}     skill
 * @apiSuccess {Number}     minSalary
 * @apiSuccess {Number}     maxSalary
 * @apiSuccess {String}     currency
 * @apiSuccess {Date}       createdAt
 * @apiSuccess {Date}       updatedAt
 * @apiSuccess {String}     id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "title": "can tuyen nguoi 123",
 *          "department": "part time + full time",
 *          "jobType": "full Time",
 *          "location": "Ha Noi",
 *          "jobDescription": "job very good",
 *          "skill": "nodejs",
 *          "minSalary": 1000,
 *          "maxSalary": 1500,
 *          "currency": "USD",
 *          "createdAt": "2022-03-02T08:07:37.561Z",
 *          "updatedAt": "2022-03-02T08:07:37.561Z",
 *          "id": "621f25c9c7b0b2c4148033ba"
 *      }
 *
 * @apiError NotFound Job not found
 * @apiError NotFound Job not found
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
 * @api {put} /api/v1/jobs/:id 2. Edit job by id
 * @apiName edit job by id
 * @apiGroup Job
 * @apiPermission hiringManager
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiParam (Param) {String} id
 *
 * @apiParam (Body) {String} title
 * @apiParam (Body) {String} department
 * @apiParam (Body) {String} jobType
 * @apiParam (Body) {String} location
 * @apiParam (Body) {String} jobDescription
 * @apiParam (Body) {String} skill
 * @apiParam (Body) {Number} minSalary
 * @apiParam (Body) {Number} maxSalary
 * @apiParam (Body) {String} currency
 * @apiParamExample (Body) {json} Body-Example:
 *     {
 *          "title":"can tuyen nguoi 123",
 *          "department":"part time + full time",
 *          "jobType":"full Time",
 *          "location": "Ha Noi",
 *          "jobDescription":"job very good",
 *          "skill":"nodejs",
 *          "minSalary": "1000",
 *          "maxSalary": "1500",
 *          "currency": "USD"
 *      }
 *
 * @apiSuccess {String}     title
 * @apiSuccess {String}     department
 * @apiSuccess {String}     jobType
 * @apisuccess {String}     location
 * @apiSuccess {String}     jobDescription
 * @apiSuccess {String}     skill
 * @apiSuccess {Number}     minSalary
 * @apiSuccess {Number}     maxSalary
 * @apiSuccess {String}     currency
 * @apiSuccess {Date}       createdAt
 * @apiSuccess {Date}       updatedAt
 * @apiSuccess {String}     id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "title": "can tuyen nguoi 123",
 *          "department": "part time + full time",
 *          "jobType": "full Time",
 *          "location": "Ha Noi",
 *          "jobDescription": "job very good",
 *          "skill": "nodejs",
 *          "minSalary": 1000,
 *          "maxSalary": 1500,
 *          "currency": "USD",
 *          "createdAt": "2022-03-02T07:52:18.046Z",
 *          "updatedAt": "2022-03-02T07:52:18.046Z",
 *          "id": "621f2232b2f28899b7b83cb1"
 *      }
 **
 * @apiError NotFound Job not found
 * @apiError NotFound Job not found
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
 * @api {delete} /api/v1/jobs/:id 3. Delete job by id
 * @apiName delete job by id
 * @apiGroup Job
 * @apiPermission hiringManager
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiParam (Param) {String} id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError NotFound Job not found.
 * @apiError NotFound Job not found.
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
 * @api {get} /api/v1/jobs 4. Get All jobs
 * @apiName Get All jobs
 * @apiGroup Job
 * @apiPermission hiringManager
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiQuery {Number} [limit=10] limit the number of return data
 * @apiQuery {Number} [page=1]   choosing page
 * @apiQuery {String} [sortBy="createdAt:asc"] sort by any field of the return collection, Ex:<span> createdAt:asc|createdAt:desc </span>
 *
 * @apisuccess {Array}    results
 * @apiSuccess {String}   title
 * @apiSuccess {String}   department
 * @apiSuccess {String}   jobType
 * @apiSuccess {String}   jobDescription
 * @apiSuccess {String}   skill
 * @apisuccess {Date}     createdAt
 * @apiSuccess {Date}     updatedAt
 * @apiSuccess {String}   currency
 * @apiSuccess {String}   location
 * @apiSuccess {Number}   maxSalary
 * @apiSuccess {Number}   minSalary
 * @apiSuccess {String}   id
 * @apisuccess {Number}   page
 * @apiSuccess {Number}   limit
 * @apiSuccess {Number}   totalPages
 * @apiSuccess {Number}   totalResults
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "title": "tuyen nhan vien",
 *         "department": "part time + full time",
 *         "jobType": "full Time",
 *         "jobDescription": "job very good",
 *         "skill": "nodejs",
 *         "createdAt": "2022-02-24T05:51:26.635Z",
 *         "updatedAt": "2022-02-24T05:51:26.635Z",
 *         "currency": "USD",
 *         "location": "Ha Noi",
 *         "maxSalary": 1500,
 *         "minSalary": 1000,
 *         "id": "62171cdeaa07d7c168612c1d"
 *     },
 *     {
 *         "title": "tuyen nhan vien IT",
 *         "department": "part time + full time",
 *         "jobType": "full Time",
 *         "jobDescription": "job very good",
 *         "skill": "nodejs",
 *         "createdAt": "2022-02-24T05:51:26.635Z",
 *         "updatedAt": "2022-02-24T05:51:26.635Z",
 *         "currency": "USD",
 *         "location": "Ha Noi",
 *         "maxSalary": 1500,
 *         "minSalary": 1000,
 *         "id": "62171cdeaa07d7c168612c1d"
 *     },
 *     {
 *         "title": "can tuyen nguoi",
 *         "department": "part time + full time",
 *         "jobType": "full Time",
 *         "location": "Ha Noi",
 *         "jobDescription": "job very good",
 *         "skill": "nodejs",
 *         "minSalary": 1000,
 *         "maxSalary": 1500,
 *         "current": "USD",
 *         "createdAt": "2022-03-01T08:39:58.730Z",
 *         "updatedAt": "2022-03-01T08:39:58.730Z",
 *         "id": "621ddbdef867a3ae0fc88af8"
 *     }
 *
 * @apiError NotFound Job not found.
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
 * @api {get} /api/v1/jobs/:id 4. Job detail
 * @apiName job detail
 * @apiGroup Job
 * @apiPermission admin, hiringManager, employee
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiQuery {Number} [limit=10] limit the number of return data
 * @apiQuery {Number} [page=1]   choosing page
 * @apiQuery {String} [sortBy="createdAt:asc"] sort by any field of the return collection, Ex:<span> createdAt:asc|createdAt:desc </span>
 *
 * @apiParam (Param) {String} id
 *
 * @apisuccess {Array}    results
 * @apiSuccess {String}   title
 * @apiSuccess {String}   department
 * @apiSuccess {String}   jobType
 * @apiSuccess {String}   jobDescription
 * @apiSuccess {String}   skill
 * @apisuccess {Date}     createdAt
 * @apiSuccess {Date}     updatedAt
 * @apiSuccess {String}   currency
 * @apiSuccess {String}   location
 * @apiSuccess {Number}   maxSalary
 * @apiSuccess {Number}   minSalary
 * @apiSuccess {String}   id
 * @apisuccess {Number}   page
 * @apiSuccess {Number}   limit
 * @apiSuccess {Number}   totalPages
 * @apiSuccess {Number}   totalResults
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "title": "tuyen nhan vien",
 *         "department": "part time + full time",
 *         "jobType": "full Time",
 *         "jobDescription": "job very good",
 *         "skill": "nodejs",
 *         "createdAt": "2022-02-24T05:51:26.635Z",
 *         "updatedAt": "2022-02-24T05:51:26.635Z",
 *         "currency": "USD",
 *         "location": "Ha Noi",
 *         "maxSalary": 1500,
 *         "minSalary": 1000,
 *         "id": "62171cdeaa07d7c168612c1d"
 *     }
 *
 * @apiError NotFound Job not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 400,
 *       "message": "User not found",
 *       "stack": ".......",
 *     }
 */
