const authRouter = require('./auth/auth.router');
const jobRouter = require('./job/job.router');


const router = require('express').Router();

router.use('/auth', authRouter);
router.use('/jobs', jobRouter);

module.exports = router;
