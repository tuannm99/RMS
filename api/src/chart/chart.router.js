const router = require('express').Router();

const chartController = require('./chart.controller');

router.get('/101', chartController.countJobByDepartment);
router.get('/102', chartController.countSex);
router.get('/103', chartController.countRole);
router.get('/104', chartController.countJobStatus);
router.get('/countCandidate', chartController.countCandidate);
router.get('/countCandidateApproved', chartController.countCandidateApproved);
router.get('/countCandidateRejected', chartController.countCandidateRejected);

module.exports = router;
