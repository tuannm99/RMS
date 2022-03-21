const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const { Candidate, Job } = require('../core/db/schema');

/**
 * create new candidate
 * @param {Object} candidateData
 * @returns {Promise<Candidate>}
 */
const createCandidate = async (candidateData) => {
  const candidate = new Candidate(candidateData);
  const job = await Job.findById(candidateData.jobId);
  job.candidateId.push(candidateData.jobId);
  await job.save();
  // eslint-disable-next-line no-return-await
  return await candidate.save();
};

/**
 * show full candidate
 * @returns {Promise<Candidate>}
 */
const getAllCandidate = async (filter, options) => {
  filter.fullName = { $regex: `${filter.fullName ? filter.fullName : ''}`, $options: 'i' };
  const candidates = await Candidate.paginate(filter, options);
  if (!candidates) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such candidate found');
  }
  return candidates;
};

/**
 * show candidate by id
 * @param {object} id
 * @returns {Promise<Candidate>}
 */
const getCandidateById = async (id) => {
  const candidate = await Candidate.findById(id);
  if (!candidate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such candidate found');
  }
  return candidate;
};

/**
 * edit candidate by id
 * @param {object} id
 * @param {object} candidateData
 * @returns {Promise<Candidate>}
 */
const editCandidateById = async (id, candidateData) => {
  const candidate = await Candidate.findByIdAndUpdate(id, candidateData);
  if (!candidate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such candidate found');
  }
  return candidate;
};

/**
 * delete candidate by id
 * @param {object} id
 */
const deleteCandidateById = async (id) => {
  const candidate = await Candidate.findByIdAndDelete(id);
  if (!candidate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such candidate found');
  }
};

module.exports = {
  createCandidate,
  getAllCandidate,
  getCandidateById,
  editCandidateById,
  deleteCandidateById,
};
