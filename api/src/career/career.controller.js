const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const jobService = require('../job/job.service');
const { pick } = require('../core/utils');

/**
 * middleware show all job
 * @param {object} req
 * @param {object} res
 */
const getAllPublishJobsHandler = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'department']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const listJob = await jobService.getAllPublishedJob(filter, options);
  res.status(httpStatus.OK).json(listJob);
});

/**
 * @param {object} req
 * @param {object} res
 */
const getPublishedJobHandler = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  res.status(httpStatus.OK).json(job);
});

/**
 * @param {object} req
 * @param {object} res
 */
const addResumeHandler = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).json({});
});

module.exports = { getAllPublishJobsHandler, getPublishedJobHandler, addResumeHandler };
