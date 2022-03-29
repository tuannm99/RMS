const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const userService = require('../user/user.service');
const interviewService = require('./interview.service');
const { pick } = require('../core/utils');

/**
 * middleware add interview
 * @param {object} req
 * @param {object} res
 */
const addInterview = catchAsync(async (req, res) => {
  const userId = await userService.getUserIdFromHeaderToken(req.headers.authorization);
  const { body } = req;
  body.scheduleBy = userId;
  const interview = await interviewService.createInterview(body);
  res.status(httpStatus.OK).json(interview);
});

/**
 * middleware show all interview
 * @param {object} req
 * @param {object} res
 */
const getAllInterview = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['scheduleBy', 'interviewDate', 'interviewer']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const listInterview = await interviewService.getAllInterview(filter, options);
  res.status(httpStatus.OK).json(listInterview);
});

/**
 * middleware get interview by id
 * @param {object} req
 * @param {object} res
 */
const getInterview = catchAsync(async (req, res) => {
  const candidate = await interviewService.getInterviewById(req.params.id);
  res.status(httpStatus.OK).json(candidate);
});

/**
 * middleware edit interview by id
 * @param {object} req
 * @param {object} res
 */
const editInterview = catchAsync(async (req, res) => {
  const candidateEdited = await interviewService.editInterviewById(req.params.id, req.body);
  res.status(httpStatus.OK).json(candidateEdited);
});

/**
 * middleware edit interview feedback by id
 * @param {object} req
 * @param {object} res
 */
const editInterviewFeedback = catchAsync(async (req, res) => {
  const candidateEdited = await interviewService.editInterviewById(req.params.id, req.body);
  res.status(httpStatus.OK).json(candidateEdited);
});

/**
 * middleware delete interview by id
 * @param {object} req
 * @param {object} res
 */
const deleteInterview = catchAsync(async (req, res) => {
  const candidateDeleted = await interviewService.deleteInterviewById(req.params.id);
  res.status(httpStatus.OK).json(candidateDeleted);
});

module.exports = {
  addInterview,
  getAllInterview,
  getInterview,
  editInterview,
  editInterviewFeedback,
  deleteInterview,
};
