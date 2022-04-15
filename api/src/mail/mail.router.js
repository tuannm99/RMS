const router = require('express').Router();
const mailController = require('./mail.controller');

router.post('/', mailController.send);

module.exports = router;
