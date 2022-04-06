const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const chartService = require('./chart.service');
// const { pick } = require('../core/utils');

const countJobByDepartment = catchAsync(async (req, res) => {
  const job = await chartService.countJobByDepartment(req.query.department);
  const count = job.length;
  res.status(httpStatus.OK).json(count);
});

module.exports = {
  countJobByDepartment,
};
