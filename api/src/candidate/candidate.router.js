const router = require('express').Router();
const candidateController = require('./candidate.controller');

router.get('/', candidateController.getAllCandidate);
router.get('/:id', candidateController.getCandidate);
router.post('/', candidateController.addCandidate);
router.put('/:id', candidateController.editCandidate);
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;

/**
 * @api {post} /api/v1/candidates 1. Add candidate
 * @apiName add candidate
 * @apiGroup Candidate
 * @apiPermission admin, hiringManager
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiParam (Body) {String} title
 * @apiParam (Body) {String} firstName
 * @apiParam (Body) {String} midName
 * @apiParam (Body) {String} lastName
 * @apiParam (Body) {String} email
 * @apiParam (Body) {Number} phone
 * @apiParam (Body) {String} hyperlink
 * @apiParam (Body) {Object} employer
 * @apiParam (Body) {String} employer.designation
 * @apiParam (Body) {String} employer.bussinessName
 * @apiParam (Body) {Date} employer.from
 * @apiParam (Body) {Date} employer.to
 * @apiParam (Body) {String} employer.summary
 * @apiParam (Body) {Object} education
 * @apiParam (Body) {String} education.degree
 * @apiParam (Body) {String} education.universityName
 * @apiParam (Body) {String} education.fieldOfStudy
 * @apiParam (Body) {String} education.grade
 * @apiParam (Body) {Date} education.from
 * @apiParam (Body) {Date} education.end
 * @apiParam (Body) {String} statusCandidate
 * @apiParamExample (Body) {json} Body-Example:
 *     {
 *         "title": "Apply IT Job",
 *         "firstName": "Pham",
 *         "midName": "Tuan",
 *         "lastName": "Son",
 *         "email": "sonpt213@fpt.edu.vn" ,
 *         "phone": "0368641166",
 *         "hyperlink": "https://www.facebook.com/",
 *         "employer": {
 *             "designation": "",
 *             "bussinessName": "",
 *             "from": "",
 *             "to": "",
 *             "summary": ""
 *         },
 *         "education": {
 *             "degree": "university",
 *             "universityName": "FPT",
 *             "fieldOfStudy": "SE",
 *             "grade": "ok",
 *             "from": "2019-02-23T09:06:27.411Z",
 *             "end": "2022-02-23T09:06:27.411Z"
 *         },
 *         "statusCandidate": "open"
 *     }
 *
 * @apiSuccess {String}     title
 * @apiSuccess {String}     firstName
 * @apiSuccess {String}     midName
 * @apiSuccess {String}     lastName
 * @apiSuccess {String}     email
 * @apiSuccess {Number}     phone
 * @apiSuccess {String}     hyperlink
 * @apiSuccess {Object}     employer
 * @apiSuccess {String}     employer.designation
 * @apiSuccess {String}     employer.bussinessName
 * @apiSuccess {Date}       employer.from
 * @apiSuccess {Date}       employer.to
 * @apiSuccess {String}     employer.summary
 * @apiSuccess {Object}     education
 * @apiSuccess {String}     education.degree
 * @apiSuccess {String}     education.universityName
 * @apiSuccess {String}     education.fieldOfStudy
 * @apiSuccess {String}     education.grade
 * @apiSuccess {Date}       education.from
 * @apiSuccess {Date}       education.end
 * @apiSuccess {String}     statusCandidate
 * @apiSuccess {Date}       createdAt
 * @apiSuccess {Date}       updatedAt
 * @apiSuccess {String}     id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "title": "Apply IT Job",
 *         "firstName": "Pham",
 *         "midName": "Tuan",
 *         "lastName": "Son",
 *         "email": "sonpt213@fpt.edu.vn",
 *         "phone": 368641166,
 *         "hyperlink": "https://www.facebook.com/",
 *         "employer": {
 *             "designation": "",
 *             "bussinessName": "",
 *             "from": null,
 *             "to": null,
 *             "summary": ""
 *         },
 *         "education": {
 *             "degree": "university",
 *             "universityName": "FPT",
 *             "fieldOfStudy": "SE",
 *             "grade": "ok",
 *             "from": "2019-02-23T09:06:27.411Z",
 *             "end": "2022-02-23T09:06:27.411Z"
 *         },
 *         "statusCandidate": "open",
 *         "createdAt": "2022-03-03T03:23:16.432Z",
 *         "updatedAt": "2022-03-03T03:23:16.432Z",
 *         "id": "622034a4e49b86d3bee7504f"
 *     }
 *
 * @apiError NotFound Candidate not found
 * @apiError NotFound Candidate not found
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
 * @api {put} /api/v1/candidates/:id 2. Edit candidate by id
 * @apiName edit candidate by id
 * @apiGroup Candidate
 * @apiPermission admin, hiringManager
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiParam (Param) {String} id
 *
 * @apiParam (Body) {String} title
 * @apiParam (Body) {String} firstName
 * @apiParam (Body) {String} midName
 * @apiParam (Body) {String} lastName
 * @apiParam (Body) {String} email
 * @apiParam (Body) {Number} phone
 * @apiParam (Body) {String} hyperlink
 * @apiParam (Body) {Object} employer
 * @apiParam (Body) {String} employer.designation
 * @apiParam (Body) {String} employer.bussinessName
 * @apiParam (Body) {Date} employer.from
 * @apiParam (Body) {Date} employer.to
 * @apiParam (Body) {String} employer.summary
 * @apiParam (Body) {Object} education
 * @apiParam (Body) {String} education.degree
 * @apiParam (Body) {String} education.universityName
 * @apiParam (Body) {String} education.fieldOfStudy
 * @apiParam (Body) {String} education.grade
 * @apiParam (Body) {Date} education.from
 * @apiParam (Body) {Date} education.end
 * @apiParam (Body) {String} statusCandidate
 * @apiParamExample (Body) {json} Body-Example:
 *     {
 *         "title": "tao di tim viec",
 *         "firstName": "Pham",
 *         "midName": "Tuan",
 *         "lastName": "Son",
 *         "email": "sonpham@fpt.edu.vn" ,
 *         "phone": "0368641166",
 *         "hyperlink": "https://www.facebook.com/cau.nhoc.smile/",
 *         "employer": {
 *             "designation": "",
 *             "bussinessName": "",
 *             "from": "",
 *             "to": "",
 *             "summary": ""
 *         },
 *         "education": {
 *             "degree": "university",
 *             "universityName": "FPT",
 *             "fieldOfStudy": "SE",
 *             "grade": "ok",
 *             "from": "2019-02-23T09:06:27.411Z",
 *             "end": "2022-02-23T09:06:27.411Z"
 *         },
 *         "statusCandidate": "open"
 *     }
 *
 * @apiSuccess {String}     title
 * @apiSuccess {String}     firstName
 * @apiSuccess {String}     midName
 * @apiSuccess {String}     lastName
 * @apiSuccess {String}     email
 * @apiSuccess {Number}     phone
 * @apiSuccess {String}     hyperlink
 * @apiSuccess {Object}     employer
 * @apiSuccess {String}     employer.designation
 * @apiSuccess {String}     employer.bussinessName
 * @apiSuccess {Date}       employer.from
 * @apiSuccess {Date}       employer.to
 * @apiSuccess {String}     employer.summary
 * @apiSuccess {Object}     education
 * @apiSuccess {String}     education.degree
 * @apiSuccess {String}     education.universityName
 * @apiSuccess {String}     education.fieldOfStudy
 * @apiSuccess {String}     education.grade
 * @apiSuccess {Date}       education.from
 * @apiSuccess {Date}       education.end
 * @apiSuccess {String}     statusCandidate
 * @apiSuccess {Date}       createdAt
 * @apiSuccess {Date}       updatedAt
 * @apiSuccess {String}     id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "employer": {
 *             "designation": "",
 *             "bussinessName": "",
 *             "from": null,
 *             "to": null,
 *             "summary": ""
 *         },
 *         "education": {
 *             "degree": "university",
 *             "universityName": "FPT",
 *             "fieldOfStudy": "SE",
 *             "grade": "ok",
 *             "from": "2019-02-23T09:06:27.411Z",
 *             "end": "2022-02-23T09:06:27.411Z"
 *         },
 *         "title": "Apply IT Job",
 *         "firstName": "Pham",
 *         "midName": "Tuan",
 *         "lastName": "Son",
 *         "email": "sonpham@fpt.edu.vn",
 *         "phone": 368641166,
 *         "hyperlink": "https://www.facebook.com/cau.nhoc.smile/",
 *         "statusCandidate": "open",
 *         "createdAt": "2022-03-03T03:32:41.763Z",
 *         "updatedAt": "2022-03-03T03:32:41.763Z",
 *         "id": "622036d9e49b86d3bee75056"
 *     }
 **
 * @apiError NotFound Candidate not found
 * @apiError NotFound Candidate not found
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
 * @api {delete} /api/v1/candidates/:id 3. Delete candidate by id
 * @apiName delete candidate by id
 * @apiGroup Candidate
 * @apiPermission admin, hiringManager
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiParam (Param) {String} id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError NotFound Candidate not found.
 * @apiError NotFound Candidate not found.
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
 * @api {get} /api/v1/candidates 4. Get All candidates
 * @apiName Get All candidates
 * @apiGroup Candidate
 * @apiPermission admin, hiringManager
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer Token.....
 *
 * @apiQuery {Number} [limit=10] limit the number of return data
 * @apiQuery {Number} [page=1]   choosing page
 * @apiQuery {String} [sortBy="createdAt:asc"] sort by any field of the return collection, Ex:<span> createdAt:asc|createdAt:desc </span>
 *
 * @apiSuccess {String}     title
 * @apiSuccess {String}     firstName
 * @apiSuccess {String}     midName
 * @apiSuccess {String}     lastName
 * @apiSuccess {String}     email
 * @apiSuccess {Number}     phone
 * @apiSuccess {String}     hyperlink
 * @apiSuccess {Object}     employer
 * @apiSuccess {String}     employer.designation
 * @apiSuccess {String}     employer.bussinessName
 * @apiSuccess {Date}       employer.from
 * @apiSuccess {Date}       employer.to
 * @apiSuccess {String}     employer.summary
 * @apiSuccess {Object}     education
 * @apiSuccess {String}     education.degree
 * @apiSuccess {String}     education.universityName
 * @apiSuccess {String}     education.fieldOfStudy
 * @apiSuccess {String}     education.grade
 * @apiSuccess {Date}       education.from
 * @apiSuccess {Date}       education.end
 * @apiSuccess {String}     statusCandidate
 * @apiSuccess {Date}       createdAt
 * @apiSuccess {Date}       updatedAt
 * @apiSuccess {String}     id
 * @apisuccess {Number}     page
 * @apiSuccess {Number}     limit
 * @apiSuccess {Number}     totalPages
 * @apiSuccess {Number}     totalResults
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "employer": {
 *                 "designation": "",
 *                 "bussinessName": "",
 *                 "from": null,
 *                 "to": null,
 *                 "summary": ""
 *             },
 *             "education": {
 *                 "degree": "university",
 *                 "universityName": "FPT",
 *                 "fieldOfStudy": "SE",
 *                 "grade": "ok",
 *                 "from": "2019-02-23T09:06:27.411Z",
 *                 "end": "2022-02-23T09:06:27.411Z"
 *             },
 *             "title": "Apply IT Job",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt@fpt.edu.vn",
 *             "phone": 368641166,
 *             "hyperlink": "https://www.facebook.com/",
 *             "statusCandidate": "open",
 *             "createdAt": "2022-03-01T10:25:04.532Z",
 *             "updatedAt": "2022-03-01T10:25:04.532Z",
 *             "id": "621df480a52de62840ba0322"
 *         },
 *         {
 *             "employer": {
 *                 "designation": "",
 *                 "bussinessName": "",
 *                 "from": null,
 *                 "to": null,
 *                 "summary": ""
 *             },
 *             "education": {
 *                 "degree": "university",
 *                 "universityName": "FPT",
 *                 "fieldOfStudy": "SE",
 *                 "grade": "ok",
 *                 "from": "2019-02-23T09:06:27.411Z",
 *                 "end": "2022-02-23T09:06:27.411Z"
 *             },
 *             "title": "Apply IT Job",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt1@fpt.edu.vn",
 *             "phone": 368641166,
 *             "hyperlink": "https://www.facebook.com/",
 *             "statusCandidate": "open",
 *             "createdAt": "2022-03-01T10:25:52.937Z",
 *             "updatedAt": "2022-03-01T10:25:52.937Z",
 *             "id": "621df4b0a52de62840ba0327"
 *         },
 *         {
 *             "employer": {
 *                 "designation": "",
 *                 "bussinessName": "",
 *                 "from": null,
 *                 "to": null,
 *                 "summary": ""
 *             },
 *             "education": {
 *                 "degree": "university",
 *                 "universityName": "FPT",
 *                 "fieldOfStudy": "SE",
 *                 "grade": "ok",
 *                 "from": "2019-02-23T09:06:27.411Z",
 *                 "end": "2022-02-23T09:06:27.411Z"
 *             },
 *             "title": "Apply IT Job",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt21@fpt.edu.vn",
 *             "phone": 368641166,
 *             "hyperlink": "https://www.facebook.com/",
 *             "statusCandidate": "open",
 *             "createdAt": "2022-03-01T10:25:55.855Z",
 *             "updatedAt": "2022-03-01T10:25:55.855Z",
 *             "id": "621df4b3a52de62840ba0329"
 *         },
 *         {
 *             "employer": {
 *                 "designation": "",
 *                 "bussinessName": "",
 *                 "from": null,
 *                 "to": null,
 *                 "summary": ""
 *             },
 *             "education": {
 *                 "degree": "university",
 *                 "universityName": "FPT",
 *                 "fieldOfStudy": "SE",
 *                 "grade": "ok",
 *                 "from": "2019-02-23T09:06:27.411Z",
 *                 "end": "2022-02-23T09:06:27.411Z"
 *             },
 *             "title": "Apply IT Job",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt213@fpt.edu.vn",
 *             "phone": 368641166,
 *             "hyperlink": "https://www.facebook.com/",
 *             "statusCandidate": "open",
 *             "createdAt": "2022-03-03T03:23:16.432Z",
 *             "updatedAt": "2022-03-03T03:23:16.432Z",
 *             "id": "622034a4e49b86d3bee7504f"
 *         },
 *         {
 *             "employer": {
 *                 "designation": "",
 *                 "bussinessName": "",
 *                 "from": null,
 *                 "to": null,
 *                 "summary": ""
 *             },
 *             "education": {
 *                 "degree": "university",
 *                 "universityName": "FPT",
 *                 "fieldOfStudy": "SE",
 *                 "grade": "ok",
 *                 "from": "2019-02-23T09:06:27.411Z",
 *                 "end": "2022-02-23T09:06:27.411Z"
 *             },
 *             "title": "toi di tim viec",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpham@fpt.edu.vn",
 *             "phone": 368641166,
 *             "hyperlink": "https://www.facebook.com/",
 *             "statusCandidate": "open",
 *             "createdAt": "2022-03-03T03:32:41.763Z",
 *             "updatedAt": "2022-03-03T03:32:41.763Z",
 *             "id": "622036d9e49b86d3bee75056"
 *         }
 *     ]
 *
 * @apiError NotFound Candidate not found.
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
 * @api {get} /api/v1/candidates/:id 4. Candidate detail
 * @apiName candidate detail
 * @apiGroup Candidate
 * @apiPermission admin, hiringManager
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
 * @apiSuccess {String}     title
 * @apiSuccess {String}     firstName
 * @apiSuccess {String}     midName
 * @apiSuccess {String}     lastName
 * @apiSuccess {String}     email
 * @apiSuccess {Number}     phone
 * @apiSuccess {String}     hyperlink
 * @apiSuccess {Object}     employer
 * @apiSuccess {String}     employer.designation
 * @apiSuccess {String}     employer.bussinessName
 * @apiSuccess {Date}       employer.from
 * @apiSuccess {Date}       employer.to
 * @apiSuccess {String}     employer.summary
 * @apiSuccess {Object}     education
 * @apiSuccess {String}     education.degree
 * @apiSuccess {String}     education.universityName
 * @apiSuccess {String}     education.fieldOfStudy
 * @apiSuccess {String}     education.grade
 * @apiSuccess {Date}       education.from
 * @apiSuccess {Date}       education.end
 * @apiSuccess {String}     statusCandidate
 * @apiSuccess {Date}       createdAt
 * @apiSuccess {Date}       updatedAt
 * @apiSuccess {String}     id
 * @apisuccess {Number}     page
 * @apiSuccess {Number}     limit
 * @apiSuccess {Number}     totalPages
 * @apiSuccess {Number}     totalResults
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "employer": {
 *             "designation": "",
 *             "bussinessName": "",
 *             "from": null,
 *             "to": null,
 *             "summary": ""
 *         },
 *         "education": {
 *             "degree": "university",
 *             "universityName": "FPT",
 *             "fieldOfStudy": "SE",
 *             "grade": "ok",
 *             "from": "2019-02-23T09:06:27.411Z",
 *             "end": "2022-02-23T09:06:27.411Z"
 *         },
 *         "title": "toi di tim viec",
 *         "firstName": "Pham",
 *         "midName": "Tuan",
 *         "lastName": "Son",
 *         "email": "sonpham@fpt.edu.vn",
 *         "phone": 368641166,
 *         "hyperlink": "https://www.facebook.com/",
 *         "statusCandidate": "open",
 *         "createdAt": "2022-03-03T03:32:41.763Z",
 *         "updatedAt": "2022-03-03T03:32:41.763Z",
 *         "id": "622036d9e49b86d3bee75056"
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
