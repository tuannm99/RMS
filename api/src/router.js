const router = require('express').Router();

const authRouter = require('./auth/auth.router');
const jobRouter = require('./job/job.router');
const candidateRouter = require('./candidate/candidate.router');

router.use('/auth', authRouter);
router.use('/jobs', jobRouter);
router.use('/candidates', candidateRouter);
// eslint-disable-next-line prettier/prettier

module.exports = router;
