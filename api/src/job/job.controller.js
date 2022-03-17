const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const jobService = require('./job.service');
const userService = require('../user/user.service');
const { pick } = require('../core/utils');

/**
 * middleware add job
 * @param {object} req
 * @param {object} res
 */
const addJobPosting = catchAsync(async (req, res) => {
  const userId = await userService.getUserIdFromHeaderToken(req.headers.authorization);
  const { body } = req;
  body.userId = userId;
  const jobPosting = await jobService.createJob(body);
  res.status(httpStatus.OK).json(jobPosting);
});

/**
 * middleware show all job
 * @param {object} req
 * @param {object} res
 */
const getAllJob = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const listJob = await jobService.getAllJob(filter, options);
  res.status(httpStatus.OK).json(listJob);
});

/**
 * middleware get job by id
 * @param {object} req
 * @param {object} res
 */
const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  res.status(httpStatus.OK).json(job);
});

/**
 * middleware edit job by id
 * @param {object} req
 * @param {object} res
 */
const editJob = catchAsync(async (req, res) => {
  const jobEdited = await jobService.editJobById(req.params.id, req.body);
  res.status(httpStatus.OK).json(jobEdited);
});

/**
 * change status
 * @param {object} req
 * @param {object} res
 */
const changeJobStatus = catchAsync(async (req, res) => {
  const jobEdited = await jobService.editJobById(req.params.id, { status: req.body.status });
  res.status(httpStatus.OK).json({ msg: 'job status updated', jobEdited });
});

/**
 * middleware delete job by id
 * @param {object} req
 * @param {object} res
 */
const deleteJob = catchAsync(async (req, res) => {
  const jobDeleted = await jobService.deleteJobById(req.params.id);
  res.status(httpStatus.OK).json(jobDeleted);
});

module.exports = {
  addJobPosting,
  getAllJob,
  getJob,
  editJob,
  changeJobStatus,
  deleteJob,
};
