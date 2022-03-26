const router = require('express').Router();
const { uploadFile } = require('../core/multer');

const careerController = require('./career.controller');

router.get('/jobs', careerController.getAllPublishJobsHandler);
router.get('/jobs/:id', careerController.getPublishedJobHandler);
router.post('/jobs/:id/resume', uploadFile.single('cv'), careerController.addResumeHandler);

module.exports = router;
