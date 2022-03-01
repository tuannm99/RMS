const router = require('express').Router();
const candidateController = require('./candidate.controller');

router.get('/', candidateController.getAllCandidate);
router.get('/:id', candidateController.getCandidate);
router.post('/', candidateController.addCandidatePosting);
router.put('/:id', candidateController.editCandidatePosting);
router.delete('/:id', candidateController.deleteCandidatePosting);

module.exports = router;
