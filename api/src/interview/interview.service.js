const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const { Interview } = require('../core/db/schema');

/**
 * create new interview
 * @param {Object} interviewData
 * @returns {Promise<Interview>}
 */
const createInterview = async (interviewData) => {
  const newInterview = new Interview(interviewData);

  // eslint-disable-next-line no-return-await
  return await newInterview.save();
};

/**
 * query full interviews
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllInterview = async (filter, options) => {
  options.populate = [];
  options.populate.push({
    path: 'interviewer',
  });
  options.populate.push({
    path: 'candidateId',
  });
  options.populate.push({
    path: 'scheduleBy',
  });
  const interviews = await Interview.paginate(filter, options);
  return interviews;
};

/**
 * show interview by id
 * @param {objectId} id
 * @returns {Promise<Interview>}
 */
const getInterviewById = async (id) => {
  const interview = await Interview.findById(id);
  if (!interview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such interview found');
  }
  return interview;
};

/**
 * edit interview by id
 * @param {objectId} id
 * @param {object} interviewData
 * @returns {Promise<Interview>}
 */
const editInterviewById = async (id, interviewData) => {
  const interview = await Interview.findByIdAndUpdate(id, interviewData, { new: true });
  if (!interview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such interview found');
  }
  return interview;
};

/**
 * edit interview feedback
 * @param {objectId} id
 * @param {object} interviewData
 * @returns {Promise<Interview>}
 */

/**
 * delete interview by id
 * @param {objectId} id
 */
const deleteInterviewById = async (id) => {
  const interview = await Interview.findByIdAndDelete(id);
  if (!interview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such interview found');
  }
};

module.exports = {
  createInterview,
  getAllInterview,
  getInterviewById,
  editInterviewById,
  deleteInterviewById,
};
