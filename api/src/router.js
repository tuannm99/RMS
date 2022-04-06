const router = require('express').Router();

const authRouter = require('./auth/auth.router');
const jobRouter = require('./job/job.router');
const userRouter = require('./user/user.router');
const candidateRouter = require('./candidate/candidate.router');
const interviewRouter = require('./interview/interview.router');
const careerRouter = require('./career/career.router');
const chartRouter = require('./chart/chart.router');

router.use('/auth', authRouter);
router.use('/jobs', jobRouter);
router.use('/users', userRouter);
router.use('/candidates', candidateRouter);
router.use('/candidates', interviewRouter);
router.use('/careers', careerRouter);
router.use('/chart', chartRouter);

module.exports = router;
