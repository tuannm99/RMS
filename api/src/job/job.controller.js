const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const jobService = require('./job.service');
const userService = require('../user/user.service');
const { pick, utf8ToASCII, removeSpace } = require('../core/utils');

/**
 * middleware add job
 * @param {object} req
 * @param {object} res
 */
const addJobPosting = catchAsync(async (req, res) => {
  const userId = await userService.getUserIdFromHeaderToken(req.headers.authorization);
  const { body } = req;
  body.userId = userId;
  body.unsignedTitle = utf8ToASCII(body.title);
  body.title = removeSpace(body.title);
  const jobPosting = await jobService.createJob(body);
  res.status(httpStatus.OK).json(jobPosting);
});

/**
 * middleware show all job
 * @param {object} req
 * @param {object} res
 */
const getAllJob = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  filter.title = removeSpace(filter.title);
  filter.unsignedTitle = utf8ToASCII(filter.title);
  const listJob = await jobService.getAllJob(filter, options);
  res.status(httpStatus.OK).json(listJob);
});

const getAllJobShort = catchAsync(async (req, res) => {
  const listJob = await jobService.getAllJobTitle();
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
  const jobEdited = await jobService.editJobById(req.params.id, {
    ...req.body,
    unsignedTitle: utf8ToASCII(req.body.title),
    title: removeSpace(req.body.title),
  });
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

const hardDeleteJob = catchAsync(async (req, res) => {
  const jobDeleted = await jobService.hardDeleteJobById(req.params.id);
  res.status(httpStatus.OK).json(jobDeleted);
});

module.exports = {
  addJobPosting,
  getAllJob,
  getAllJobShort,
  getJob,
  editJob,
  changeJobStatus,
  deleteJob,
  hardDeleteJob,
};
