const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const chartService = require('./chart.service');
// const { pick } = require('../core/utils');

const countJobByDepartment = catchAsync(async (req, res) => {
  const job = await chartService.countJobByDepartment();
  res.status(httpStatus.OK).json(job);
});

module.exports = {
  countJobByDepartment,
};
