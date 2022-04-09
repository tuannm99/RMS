const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const { Candidate, Job } = require('../core/db/schema');
const jobService = require('../job/job.service');

/**
 * create new candidate
 * @param {Object} candidatePayload
 * @returns {Promise<Candidate>}
 */
const createCandidate = async (candidatePayload) => {
  const candidate = new Candidate(candidatePayload);
  const job = await jobService.getJobById(candidatePayload.jobId);
  job.candidateId.push(candidate._id);
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
  options.populate = [];
  options.populate.push({
    path: 'jobId',
    // select: 'title',
  });
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
  const candidate = await Candidate.findById(id).populate({ path: 'jobId' });
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
  const candidate = await Candidate.findByIdAndUpdate(id, candidateData, { new: true });
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
  // delete candidate ref in Job
  await Job.findByIdAndUpdate(
    { _id: candidate.jobId },
    {
      $pull: {
        candidateId: candidate._id,
      },
    }
  );
};

module.exports = {
  createCandidate,
  getAllCandidate,
  getCandidateById,
  editCandidateById,
  deleteCandidateById,
};
