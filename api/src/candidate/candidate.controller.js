const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const candidateService = require('./candidate.service');
const { pick } = require('../core/utils');

/**
 * middleware add candidate
 * @param {object} req
 * @param {object} res
 */
const addCandidate = catchAsync(async (req, res) => {
  const candidatePayload = JSON.parse(req.body.candidate);
  const candidate = await candidateService.createCandidate(candidatePayload, req.file);
  res.status(httpStatus.OK).json(candidate);
});

/**
 * middleware show all candidate
 * @param {object} req
 * @param {object} res
 */
const getAllCandidate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fullName', 'jobId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const listCandidate = await candidateService.getAllCandidate(filter, options);
  res.status(httpStatus.OK).json(listCandidate);
});

/**
 * middleware get candidate by id
 * @param {object} req
 * @param {object} res
 */
const getCandidate = catchAsync(async (req, res) => {
  const candidate = await candidateService.getCandidateById(req.params.id);
  res.status(httpStatus.OK).json(candidate);
});

/**
 * middleware edit candidate by id
 * @param {object} req
 * @param {object} res
 */
const editCandidate = catchAsync(async (req, res) => {
  const candidatePayload = JSON.parse(req.body.candidate);
  const cv = req.file;
  if (cv) {
    if (!candidatePayload.resume) {
      candidatePayload.resume = { cv };
    } else {
      candidatePayload.resume.cv = cv;
    }
  }
  const candidateEdited = await candidateService.editCandidateById(req.params.id, candidatePayload);
  res.status(httpStatus.OK).json(candidateEdited);
});

/**
 * middleware delete candidate by id
 * @param {object} req
 * @param {object} res
 */
const deleteCandidate = catchAsync(async (req, res) => {
  const candidateDeleted = await candidateService.deleteCandidateById(req.params.id);
  res.status(httpStatus.OK).json(candidateDeleted);
});

module.exports = {
  addCandidate,
  getAllCandidate,
  getCandidate,
  editCandidate,
  deleteCandidate,
};
