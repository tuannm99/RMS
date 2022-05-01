const moment = require('moment');
const httpStatus = require('http-status');
const ApiError = require('../core/apiError');
const { Interview } = require('../core/db/schema');

/**
 * create new interview
 * @param {Object} interviewData
 * @returns {Promise<Interview>}
 */
const createInterview = async (interviewData) => {
  // check overlap date
  const interviews = await Interview.find({
    interviewDate: { $gte: Date.now() },
  });
  interviews.forEach((interview) => {
    const startInput = moment.utc(interviewData.interviewDate).toDate().getTime();
    const endInput = startInput + interviewData.duration * 60 * 1000;
    const startExist = moment.utc(interview.toJSON().interviewDate).toDate().getTime();
    const endExist = startExist + interview.toJSON().duration * 60 * 1000;
    if (startInput < endExist && endInput > startExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'User has busy for another interview, please check calender!'
      );
    }
  });

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
  if (filter.interviewDate === 'upcoming') {
    filter.interviewDate = { $gt: Date.now() };
  } else if (filter.interviewDate === 'recently') {
    filter.interviewDate = { $lt: Date.now() };
  } else if (filter.interviewDate === 'today') {
    const now = new Date();
    const start = now.setHours(0, 0, 0, 0);
    const end = now.setHours(23, 59, 59, 999);
    filter.interviewDate = { $gte: start, $lte: end };
  }
  options.populate = [];
  options.populate.push({
    path: 'interviewer',
    select: 'fullName',
  });
  options.populate.push({
    path: 'candidateId',
    select: 'fullName',
  });
  options.populate.push({
    path: 'scheduleBy',
    select: 'fullName',
  });
  if (!options.limit) {
    options.limit = 1000;
  }
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
  // check overlap date
  const currentInterview = await Interview.findById(id);
  const interviews = await Interview.find({
    interviewDate: { $gte: Date.now() },
    interviewer: interviewData.interviewer,
  });

  const removeUpdatedDate = interviews.filter((interview) => {
    return !(interview.interviewDate.toString() === currentInterview.interviewDate.toString());
  });

  removeUpdatedDate.forEach((interview) => {
    const startInput = moment.utc(interviewData.interviewDate).toDate().getTime();
    const endInput = startInput + interviewData.duration * 60 * 1000;
    const startExist = moment.utc(interview.toJSON().interviewDate).toDate().getTime();
    const endExist = startExist + interview.toJSON().duration * 60 * 1000;
    if (startInput < endExist && endInput > startExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'User has busy for another interview, please check calender!'
      );
    }
  });

  interviewData.updatedAt = Date.now();
  const interview = await Interview.findByIdAndUpdate(id, interviewData, { new: true });
  if (!interview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such interview found');
  }
  return interview;
};

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
