const router = require('express').Router();

const { checkAuth } = require('../core/global.middleware');
const { ROLES } = require('../constants');
const jobController = require('./job.controller');

router.get('/', checkAuth(), jobController.getAllJob);
router.get('/:id', checkAuth(), jobController.getJob);
router.post('/', checkAuth(ROLES.hiringManager), jobController.addJobPosting);
router.put('/:id', checkAuth(ROLES.hiringManager), jobController.editJob);
router.put('/:id/status', checkAuth(ROLES.hiringManager), jobController.changeJobStatus);
router.delete('/:id', checkAuth(ROLES.hiringManager), jobController.deleteJob);

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
 *          "userId": "622b802354aef25d31c389f2",
 *          "candidateId": [],
 *          "title":"can tuyen Sale ",
 *          "department":"part time",
 *          "jobType":"full Time",
 *          "location": "Ha Noi",
 *          "jobDescription":"very good",
 *          "skill":"nodejs",
 *          "experience":"",
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
 *        "userId": "622b802354aef25d31c389f2",
 *        "candidateId": [],
 *        "title": "can tuyen Sale ",
 *        "department": "part time",
 *        "jobType": "full Time",
 *        "location": "Ha Noi",
 *        "jobDescription": "very good",
 *        "skill": "nodejs",
 *        "experience": "",
 *        "minSalary": 1000,
 *        "maxSalary": 1500,
 *        "currency": "USD",
 *        "createdAt": "2022-03-14T08:56:52.880Z",
 *        "updatedAt": "2022-03-14T08:56:52.880Z",
 *        "id": "622f03548133267a4c9073f6"
 *    }
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
 *          "userId": "622b802354aef25d31c389f2",
 *          "candidateId": [],
 *          "title":"can tuyen Sale ",
 *          "department":"part time",
 *          "jobType":"full Time",
 *          "location": "Ha Noi",
 *          "jobDescription":"very good",
 *          "skill":"nodejs",
 *          "experience":"",
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
 *        "userId": "622b802354aef25d31c389f2",
 *        "candidateId": [],
 *        "title": "can tuyen Sale ",
 *        "department": "part time",
 *        "jobType": "full Time",
 *        "location": "Ha Noi",
 *        "jobDescription": "very good",
 *        "skill": "nodejs",
 *        "experience": "",
 *        "minSalary": 1000,
 *        "maxSalary": 1500,
 *        "currency": "USD",
 *        "createdAt": "2022-03-14T08:56:52.880Z",
 *        "updatedAt": "2022-03-14T08:56:52.880Z",
 *        "id": "622f03548133267a4c9073f6"
 *    }
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
 *        {
 *            "results": [
 *                {
 *                    "candidateId": [],
 *                    "title": "tuan 1231231asdasdsadas2312",
 *                    "status": "published",
 *                    "department": "hm",
 *                    "jobType": "full Time",
 *                    "location": "Ha Noi",
 *                    "jobDescription": "job very good",
 *                    "skill": "nodejs",
 *                    "minSalary": 1000,
 *                    "maxSalary": 1500,
 *                    "createdAt": "2022-03-14T15:16:04.122Z",
 *                    "updatedAt": "2022-03-14T15:16:04.122Z",
 *                    "id": "622f5c3462354b7b6a363c37",
 *                    "candidateCount": 0
 *                },
 *                {
 *                    "candidateId": [],
 *                    "title": "tuan 1231231asdasdsadas2312",
 *                    "status": "published",
 *                    "department": "hm",
 *                    "jobType": "full Time",
 *                    "location": "Ha Noi",
 *                    "jobDescription": "job very good",
 *                    "skill": "nodejs",
 *                    "minSalary": 1000,
 *                    "maxSalary": 1500,
 *                    "createdAt": "2022-03-14T15:23:47.501Z",
 *                    "updatedAt": "2022-03-14T15:23:47.501Z",
 *                    "id": "622f5e0333688e0521b0517a",
 *                    "candidateCount": 0
 *                }
 *            ],
 *            "page": 1,
 *            "limit": 5,
 *            "totalPages": 1,
 *            "totalResults": 2
 *        }
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
 *         "userId": "622b802354aef25d31c389f2",
 *         "candidateId": [
 *             "622f03428133267a4c9073f0",
 *             "622f03428133267a4c9073f0",
 *             "622f03428133267a4c9073f0"
 *         ],
 *         "title": "can tuyen nguoi ",
 *         "department": "part time",
 *         "jobType": "full Time",
 *         "location": "Ha Noi",
 *         "jobDescription": "very good",
 *         "skill": "nodejs",
 *         "experience": "",
 *         "minSalary": 1000,
 *         "maxSalary": 1500,
 *         "currency": "USD",
 *         "createdAt": "2022-03-14T08:56:34.757Z",
 *         "updatedAt": "2022-03-14T08:56:34.757Z",
 *         "id": "622f03428133267a4c9073f0"
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
