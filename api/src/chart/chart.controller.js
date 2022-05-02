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

const countRole = catchAsync(async (req, res) => {
  const count = await chartService.countRole();
  res.status(httpStatus.OK).json(count);
});

const countJobStatus = catchAsync(async (req, res) => {
  const count = await chartService.countJobStatus();
  res.status(httpStatus.OK).json(count);
});

const countCandidate = catchAsync(async (req, res) => {
  const count = await chartService.countCandidate();
  res.status(httpStatus.OK).json(count);
});

const countCandidateApproved = catchAsync(async (req, res) => {
  const count = await chartService.countCandidateApproved();
  res.status(httpStatus.OK).json(count);
});

const countCandidateRejected = catchAsync(async (req, res) => {
  const count = await chartService.countCandidateRejected();
  res.status(httpStatus.OK).json(count);
});

module.exports = {
  countJobByDepartment,
  countSex,
  countRole,
  countJobStatus,
  countCandidate,
  countCandidateApproved,
  countCandidateRejected,
};
