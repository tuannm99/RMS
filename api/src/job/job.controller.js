const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const jobService = require('./job.service');

/**
 * middleware add job
 * @param {object} req
 * @param {object} res
 */
const addJobPosting = catchAsync(async (req, res) => {
  const jobPosting = await jobService.createJob(req.body);
  res.status(httpStatus.OK).json(jobPosting);
});

/**
 * middleware show all job
 * @param {object} req
 * @param {object} res
 */
const getAllJob = catchAsync(async (req, res) => {
  const listJob = await jobService.getAllJob();
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
const editJobPosting = catchAsync(async (req, res) => {
  const jobEdited = await jobService.editJobById(req.params.id, req.body);
  res.status(httpStatus.OK).json({ jobEdited, message: 'successful' });
});

/**
 * middleware delete job by id
 * @param {object} req
 * @param {object} res
 */
const deleteJobPosting = catchAsync(async (req, res) => {
  const jobDeleted = await jobService.deleteJobById(req.params.id);
  res.status(httpStatus.OK).json({ jobDeleted, message: 'successful' });
});

module.exports = {
  addJobPosting,
  getAllJob,
  getJob,
  editJobPosting,
  deleteJobPosting,
};
