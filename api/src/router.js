const router = require('express').Router();

const authRouter = require('./auth/auth.router');
const jobRouter = require('./job/job.router');

router.use('/auth', authRouter);
router.use('/jobs', jobRouter);
// eslint-disable-next-line prettier/prettier

module.exports = router;
