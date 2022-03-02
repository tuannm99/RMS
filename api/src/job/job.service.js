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
 * show full job
 * @returns {Promise<Job[]>}
 */
const getAllJob = async () => {
  const listJob = await Job.find();
  if (!listJob) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such job found');
  }
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
  const job = await Job.findByIdAndUpdate(id, jobData);
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
