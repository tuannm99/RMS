const authRouter = require('./auth/controllers');

const router = require('express').Router();

router.use('/auth', authRouter);

module.exports = router;
