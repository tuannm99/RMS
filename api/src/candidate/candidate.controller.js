const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const candidateService = require('./candidate.service');
const { pick, utf8ToASCII, removeSpace } = require('../core/utils');

/**
 * middleware add candidate
 * @param {object} req
 * @param {object} res
 */
const addCandidate = catchAsync(async (req, res) => {
  const candidatePayload = JSON.parse(req.body.candidate);
  candidatePayload.unsignedFullName = utf8ToASCII(candidatePayload.fullName);
  const candidate = await candidateService.createCandidate({ ...candidatePayload, cv: req.file });
  res.status(httpStatus.OK).json(candidate);
});

/**
 * middleware show all candidate
 * @param {object} req
 * @param {object} res
 */
const getAllCandidate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fullName', 'jobId', 'status', 'stages']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  filter.unsignedFullName = utf8ToASCII(filter.fullName);
  filter.fullName = removeSpace(filter.fullName);
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
  const candidatePayload = {};
  if (req.body.candidate) {
    Object.assign(candidatePayload, JSON.parse(req.body.candidate));
  }
  if (req.file) {
    Object.assign(candidatePayload, { cv: req.file });
  }
  candidatePayload.unsignedFullName = utf8ToASCII(candidatePayload.fullName);
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
