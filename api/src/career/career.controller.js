const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const jobService = require('../job/job.service');
const candidateService = require('../candidate/candidate.service');
const { pick, utf8ToASCII, removeSpace } = require('../core/utils');

/**
 * middleware show all job
 * @param {object} req
 * @param {object} res
 */
const getAllPublishJobsHandler = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'department']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  filter.title = removeSpace(filter.title);
  filter.unsignedTitle = utf8ToASCII(filter.title);
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
  const candidatePayload = JSON.parse(req.body.candidate);
  candidatePayload.jobId = req.params.id;
  const candidate = await candidateService.createCandidate({
    ...candidatePayload,
    cv: req.file,
    unsignedFullName: utf8ToASCII(candidatePayload.fullName),
    fullName: removeSpace(candidatePayload.fullName),
    firstName: removeSpace(candidatePayload.firstName),
    lastName: removeSpace(candidatePayload.lastName),
    midName: removeSpace(candidatePayload.midName),
  });
  res.status(httpStatus.OK).json(candidate);
});

module.exports = { getAllPublishJobsHandler, getPublishedJobHandler, addResumeHandler };
