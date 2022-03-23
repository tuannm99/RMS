const router = require('express').Router();

const authRouter = require('./auth/auth.router');
const jobRouter = require('./job/job.router');
const userRouter = require('./user/user.router');
const candidateRouter = require('./candidate/candidate.router');
const interviewRouter = require('./interview/interview.router');

router.use('/auth', authRouter);
router.use('/jobs', jobRouter);
router.use('/users', userRouter);
router.use('/candidates', candidateRouter);
router.use('/candidates/:id/interview', interviewRouter);

module.exports = router;
