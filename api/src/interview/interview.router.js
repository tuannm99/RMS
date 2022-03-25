const router = require('express').Router();

const { checkAuth } = require('../core/global.middleware');
// const { ROLES } = require('../constants');
const interviewController = require('./interview.controller');

router.get('/', checkAuth(), interviewController.getAllInterview);
router.get('/:id', checkAuth(), interviewController.getInterview);
router.post('/', checkAuth(), interviewController.addInterview);
router.put('/:id', checkAuth(), interviewController.editInterview);
router.put('/:id/feedbacks', checkAuth(), interviewController.editInterviewFeedback);
router.delete('/:id', checkAuth(), interviewController.deleteInterview);

module.exports = router;
