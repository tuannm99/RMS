const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const candidateService = require('./candidate.service');

/**
 * middleware add candidate
 * @param {object} req
 * @param {object} res
 */
const addCandidate = catchAsync(async (req, res) => {
  const candidatePosting = await candidateService.createCandidate(req.body);
  res.status(httpStatus.OK).json(candidatePosting);
});

/**
 * middleware show all candidate
 * @param {object} req
 * @param {object} res
 */
const getAllCandidate = catchAsync(async (req, res) => {
  const listCandidate = await candidateService.getAllCandidate();
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
  const candidateEdited = await candidateService.editCandidateById(req.params.id, req.body);
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
