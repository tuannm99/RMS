const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const chartService = require('./chart.service');
// const { pick } = require('../core/utils');

const countJobByDepartment = catchAsync(async (req, res) => {
  const job = await chartService.countJobByDepartment();
  res.status(httpStatus.OK).json(job);
});

const countSex = catchAsync(async (req, res) => {
  const totalSex = await chartService.countSex();
  res.status(httpStatus.OK).json(totalSex);
});

module.exports = {
  countJobByDepartment,
  countSex,
};
