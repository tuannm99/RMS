const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const { Job } = require('../core/db/schema');
const { omit } = require('../core/utils');

/**
 * create new job
 * @param {Object} jobData
 * @returns {Promise<Job>}
 */
const createJob = async (jobData) => {
  const jd = new Job(jobData);

  // eslint-disable-next-line no-return-await
  return await jd.save();
};

/**
 * query full job
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllJob = async (filter, options) => {
  const listJob = await Job.paginate(filter, options);
  // count all candidate
  const results = listJob.results.map((job) => {
    const jobOmit = omit(job.toJSON(), ['candidateId']);
    return {
      ...jobOmit,
      candidateCount: job.candidateId.length,
    };
  });
  listJob.results = results;
  return listJob;
};

/**
 * query all published job for career page
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllPublishedJob = async (filter, options) => {
  if (filter.title) filter.title = { $regex: filter.title, $options: 'i' };
  filter.status = 'published';
  const listJob = await Job.paginate(filter, options);
  return listJob;
};

/**
 * show job by id
 * @param {objectId} id
 * @returns {Promise<Job>}
 */
const getJobById = async (id) => {
  const job = await Job.findById(id);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such job found');
  }
  return job;
};

/**
 * edit job by id
 * @param {objectId} id
 * @param {object} jobData
 * @returns {Promise<Job>}
 */
const editJobById = async (id, jobData) => {
  const job = await Job.findByIdAndUpdate(id, jobData, { new: true });
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such job found');
  }
  return job;
};

/**
 * delete job by id
 * @param {objectId} id
 */
const deleteJobById = async (id) => {
  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such job found');
  }
};

module.exports = {
  createJob,
  getAllJob,
  getAllPublishedJob,
  getJobById,
  editJobById,
  deleteJobById,
};
