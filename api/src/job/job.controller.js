const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const jobService = require('./job.service');

const addJobPosting = catchAsync(async (req, res) => {
  const { title, department, jobType, jobDescription, skill } = req.body;
  const jobPosting = await jobService.createJob(title, department, jobType, jobDescription, skill);
  res.status(httpStatus.OK).json(jobPosting);
});

const getAllJob = catchAsync(async (req, res) => {
  const listJob = await jobService.getAllJob();
  res.status(httpStatus.OK).json(listJob);
});

const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  res.status(httpStatus.OK).json(job);
});

const editJobPosting = catchAsync(async (req, res) => {
  const jobEdited = await jobService.editJobById(req.params.id, req.body);
  res.status(httpStatus.OK).json({ jobEdited, message: 'successful' });
});

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
