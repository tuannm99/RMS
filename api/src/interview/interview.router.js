const router = require('express').Router();

const { checkAuth } = require('../core/global.middleware');
// const { ROLES } = require('../constants');
const interviewController = require('./interview.controller');

router.get('/interview/all', checkAuth(), interviewController.getAllInterview);
router.get(
  '/:candidateId/interview',
  checkAuth(),
  interviewController.getAllInterviewByCandidateId
);
router.get('/:candidateId/interview/:id', checkAuth(), interviewController.getInterview);
router.post('/:candidateId/interview', checkAuth(), interviewController.addInterview);
router.put('/:candidateId/interview/:id', checkAuth(), interviewController.editInterview);
router.put(
  '/:candidateId/interview/:id/feedbacks',
  checkAuth(),
  interviewController.editInterviewFeedback
);
router.delete('/:candidateId/interview/:id', checkAuth(), interviewController.deleteInterview);

module.exports = router;
