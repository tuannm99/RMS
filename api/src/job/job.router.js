const jobController = require('./job.controller')

const router = require('express').Router();

router.get('/', jobController.getAllJob);
router.get('/:id', jobController.getJob);
router.post('/', jobController.addJobPosting);
router.put('/:id', jobController.editJobPosting);
router.delete('/:id', jobController.deleteJobPosting);

module.exports = router;