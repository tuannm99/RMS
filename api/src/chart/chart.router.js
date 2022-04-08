const router = require('express').Router();

const chartController = require('./chart.controller');

router.get('/101', chartController.countJobByDepartment);
router.get('/102', chartController.countSex);

module.exports = router;
