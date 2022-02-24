const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const catchAsync = require('../core/catchAsync');

const jobService = require('./job.service');

const addJobPosting = catchAsync(async (req, res) => {
  const { title, department, jobType, jobDescription, skill } = req.body;
  const jobPosting = await jobService.createJob(
    title,
    department,
    jobType,
    jobDescription,
    skill
  );
  res.status(httpStatus.OK).json(jobPosting);
});

const getAllJob = catchAsync(async (req, res) => {
  const listJob = await jobService.getAllJob();
  res.status(httpStatus.OK).json(listJob);
});

const getJob = catchAsync(async (req, res) => {
  const id = req.params.id;
  const job = await jobService.getJobById(id);
  res.status(httpStatus.OK).json(job);
});

const editJobPosting = catchAsync(async (req, res) => {
  const id = req.params.id;
  const jobData = req.body;
  const jobEdited = await jobService.editJobById(id, jobData);
  const message = "successful"
  res.status(httpStatus.OK).json({ jobEdited, message});
});

const deleteJobPosting = catchAsync(async (req, res) => {
  const id = req.params.id;
  const jobDeleted = await jobService.deleteJobById(id);
  const message = "successful"
  res.status(httpStatus.OK).json({ jobDeleted, message});
});

module.exports = {
  addJobPosting,
  getAllJob,
  getJob,
  editJobPosting,
  deleteJobPosting,
};
