const router = require('express').Router();

const authRouter = require('./auth/auth.router');
const jobRouter = require('./job/job.router');
const userRouter = require('./user/user.router');
const candidateRouter = require('./candidate/candidate.router');

router.use('/auth', authRouter);
router.use('/jobs', jobRouter);
router.use('/users', userRouter);
router.use('/candidates', candidateRouter);

module.exports = router;
