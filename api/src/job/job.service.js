const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const { Job } = require('../core/db/schema');

const createJob = async (title, department, jobType, jobDescription, skill) => {
  const jd = new Job({ title, department, jobType, jobDescription, skill });
  try {
    return await jd.save();
  } catch (e) {
    throw e;
  }
};

const getAllJob = async () => {
  const listJob = await Job.find();
  if (!listJob) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such job found');
  }
  return listJob;
};

const getJobById = async (id) => {
  const job = await Job.findById(id);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such job found');
  }
  return job;
};

const editJobById = async (id, jobData) => {
  const job = await Job.findByIdAndUpdate(id, jobData);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such job found');
  }
  return job;
};

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
