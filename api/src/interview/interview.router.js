const router = require('express').Router();

// const { checkAuth } = require('../core/global.middleware');
// const { ROLES } = require('../constants');
const interviewController = require('./interview.controller');

router.get('/', interviewController.getAllInterview);
router.get('/:id', interviewController.getInterview);
router.post('/', interviewController.addInterview);
router.put('/:id', interviewController.editInterview);
router.put('/:id/feedbacks', interviewController.editInterviewFeedback);
router.delete('/:id', interviewController.deleteInterview);

module.exports = router;
