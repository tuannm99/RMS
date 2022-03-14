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
 * @apiParam (Body) {String} jobJd
 * @apiParam (Body) {String} status
 * @apiParam (Body) {String} title
 * @apiParam (Body) {String} stages
 * @apiParam (Body) {String} firstName
 * @apiParam (Body) {String} midName
 * @apiParam (Body) {String} lastName
 * @apiParam (Body) {String} email
 * @apiParam (Body) {Number} phone
 * @apiParam (Body) {Object} resume
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
 *          "jobId": "622f03548133267a4c9073f6",
 *          "status": "open",
 *          "stages": "contact",
 *          "firstName": "Pham",
 *          "midName": "Tuan",
 *          "lastName": "Son",
 *          "email": "sonpt11@fpt.edu.vn" ,
 *          "phone": "0368641166",
 *          "resume":{
 *              "CV": " ",
 *              "hyperlink": "fb.com",
 *              "employer": {
 *                  "designation": "",
 *                  "bussinessName": "",
 *                  "from": "",
 *                  "to": "",
 *                  "summary": ""
 *              },
 *              "education": {
 *                  "degree": "university",
 *                  "universityName": "FPT",
 *                  "fieldOfStudy": "SE",
 *                  "grade": "ok",
 *                  "from": "2019-02-23T09:06:27.411Z",
 *                  "end": "2022-02-23T09:06:27.411Z"
 *              }
 *          }
 *      }
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
 *         "jobId": "622f03548133267a4c9073f6",
 *         "interviewId": [],
 *         "status": "open",
 *         "stage": "contact",
 *         "firstName": "Pham",
 *         "midName": "Tuan",
 *         "lastName": "Son",
 *         "email": "sonpt11@fpt.edu.vn",
 *         "phone": 368641166,
 *         "resume": {
 *             "hyperlink": "fb.com",
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
 *             }
 *         },
 *         "createdAt": "2022-03-14T08:58:54.838Z",
 *         "updatedAt": "2022-03-14T08:58:54.838Z",
 *         "id": "622f03ce8133267a4c90742a"
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
 *          "jobId": "622f03548133267a4c9073f6",
 *          "status": "open",
 *          "stages": "contact",
 *          "firstName": "Pham",
 *          "midName": "Tuan",
 *          "lastName": "Son",
 *          "email": "sonpt11@fpt.edu.vn" ,
 *          "phone": "0368641166",
 *          "resume":{
 *              "CV": " ",
 *              "hyperlink": "fb.com",
 *              "employer": {
 *                  "designation": "",
 *                  "bussinessName": "",
 *                  "from": "",
 *                  "to": "",
 *                  "summary": ""
 *              },
 *              "education": {
 *                  "degree": "university",
 *                  "universityName": "FPT",
 *                  "fieldOfStudy": "SE",
 *                  "grade": "ok",
 *                  "from": "2019-02-23T09:06:27.411Z",
 *                  "end": "2022-02-23T09:06:27.411Z"
 *              }
 *          }
 *      }
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
 *         "jobId": "622f03548133267a4c9073f6",
 *         "interviewId": [],
 *         "status": "open",
 *         "stage": "contact",
 *         "firstName": "Pham",
 *         "midName": "Tuan",
 *         "lastName": "Son",
 *         "email": "sonpt11@fpt.edu.vn",
 *         "phone": 368641166,
 *         "resume": {
 *             "hyperlink": "fb.com",
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
 *             }
 *         },
 *         "createdAt": "2022-03-14T08:58:54.838Z",
 *         "updatedAt": "2022-03-14T08:58:54.838Z",
 *         "id": "622f03ce8133267a4c90742a"
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
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f03428133267a4c9073f0",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:12.741Z",
 *             "updatedAt": "2022-03-14T08:58:12.741Z",
 *             "id": "622f03a48133267a4c9073fa"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f03428133267a4c9073f0",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:15.749Z",
 *             "updatedAt": "2022-03-14T08:58:15.749Z",
 *             "id": "622f03a78133267a4c9073fe"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f03428133267a4c9073f0",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:16.551Z",
 *             "updatedAt": "2022-03-14T08:58:16.551Z",
 *             "id": "622f03a88133267a4c907402"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f034c8133267a4c9073f2",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:28.571Z",
 *             "updatedAt": "2022-03-14T08:58:28.571Z",
 *             "id": "622f03b48133267a4c907406"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f034c8133267a4c9073f2",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:29.278Z",
 *             "updatedAt": "2022-03-14T08:58:29.278Z",
 *             "id": "622f03b58133267a4c90740a"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f034c8133267a4c9073f2",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:30.030Z",
 *             "updatedAt": "2022-03-14T08:58:30.030Z",
 *             "id": "622f03b68133267a4c90740e"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f034c8133267a4c9073f2",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:30.621Z",
 *             "updatedAt": "2022-03-14T08:58:30.621Z",
 *             "id": "622f03b68133267a4c907412"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f034c8133267a4c9073f2",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:31.291Z",
 *             "updatedAt": "2022-03-14T08:58:31.291Z",
 *             "id": "622f03b78133267a4c907416"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f03518133267a4c9073f4",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:42.780Z",
 *             "updatedAt": "2022-03-14T08:58:42.780Z",
 *             "id": "622f03c28133267a4c90741a"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f03548133267a4c9073f6",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:52.772Z",
 *             "updatedAt": "2022-03-14T08:58:52.772Z",
 *             "id": "622f03cc8133267a4c90741e"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f03548133267a4c9073f6",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:53.368Z",
 *             "updatedAt": "2022-03-14T08:58:53.368Z",
 *             "id": "622f03cd8133267a4c907422"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f03548133267a4c9073f6",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:54.009Z",
 *             "updatedAt": "2022-03-14T08:58:54.009Z",
 *             "id": "622f03ce8133267a4c907426"
 *         },
 *         {
 *             "resume": {
 *                 "employer": {
 *                     "designation": "",
 *                     "bussinessName": "",
 *                     "from": null,
 *                     "to": null,
 *                     "summary": ""
 *                 },
 *                 "education": {
 *                     "degree": "university",
 *                     "universityName": "FPT",
 *                     "fieldOfStudy": "SE",
 *                     "grade": "ok",
 *                     "from": "2019-02-23T09:06:27.411Z",
 *                     "end": "2022-02-23T09:06:27.411Z"
 *                 },
 *                 "hyperlink": "fb.com"
 *             },
 *             "jobId": "622f03548133267a4c9073f6",
 *             "interviewId": [],
 *             "status": "open",
 *             "stage": "contact",
 *             "firstName": "Pham",
 *             "midName": "Tuan",
 *             "lastName": "Son",
 *             "email": "sonpt11@fpt.edu.vn",
 *             "phone": 368641166,
 *             "createdAt": "2022-03-14T08:58:54.838Z",
 *             "updatedAt": "2022-03-14T08:58:54.838Z",
 *             "id": "622f03ce8133267a4c90742a"
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
 *         "resume": {
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
 *             "hyperlink": "fb.com"
 *         },
 *         "jobId": "622f03428133267a4c9073f0",
 *         "interviewId": [],
 *         "status": "open",
 *         "stage": "contact",
 *         "firstName": "Pham",
 *         "midName": "Tuan",
 *         "lastName": "Son",
 *         "email": "sonpt11@fpt.edu.vn",
 *         "phone": 368641166,
 *         "createdAt": "2022-03-14T08:58:15.749Z",
 *         "updatedAt": "2022-03-14T08:58:15.749Z",
 *         "id": "622f03a78133267a4c9073fe"
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
