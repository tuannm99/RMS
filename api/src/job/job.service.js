const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const { Job } = require('../core/db/schema');

/**
 * create new job
 * @param {string} jobData
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
  // TODO: need count all candidate perjob | and verify The owner who has assign for each job
  const listJob = await Job.paginate(filter, options);
  const newListJob = listJob.results.map((job) => {
    return {
      ...job.toJSON(),
      candidateCount: job.candidateId.length,
    };
  });
  listJob.results = newListJob;
  return listJob;
};

/**
 * show job by id
 * @param {object} id
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
 * @param {object} id
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
 * @param {object} id
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
  getJobById,
  editJobById,
  deleteJobById,
};
