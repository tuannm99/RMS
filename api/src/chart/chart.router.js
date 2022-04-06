const router = require('express').Router();

const chartController = require('./chart.controller');

router.get('/101', chartController.countJobByDepartment);

module.exports = router;
