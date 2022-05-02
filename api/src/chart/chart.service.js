const { Job, User, Candidate } = require('../core/db/schema');

const countJobByDepartment = async () => {
  const jobByDepartment = await Job.aggregate([
    {
      $group: {
        _id: '$department',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        type: '$_id',
        value: '$count',
      },
    },
  ]);

  return jobByDepartment;
};
const countSex = async () => {
  const chartData = await User.aggregate([
    {
      $group: {
        _id: '$sex',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        type: '$_id',
        value: '$count',
      },
    },
  ]);

  return chartData;
};

const countRole = async () => {
  const chartData = await User.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        type: '$_id',
        value: '$count',
      },
    },
  ]);
  return chartData;
};

const countJobStatus = async () => {
  const chartData = await Job.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        type: '$_id',
        value: '$count',
      },
    },
  ]);
  return chartData;
};

const countCandidate = async () => {
  const candidate = await Candidate.find({});
  const count = candidate.length;
  return count;
};

const countCandidateApproved = async () => {
  const candidate = await Candidate.find({ status: 'approve' });
  const count = candidate.length;
  return count;
};

const countCandidateRejected = async () => {
  const candidate = await Candidate.find({ status: 'reject' });
  const count = candidate.length;
  return count;
};

module.exports = {
  countJobByDepartment,
  countSex,
  countRole,
  countJobStatus,
  countCandidate,
  countCandidateApproved,
  countCandidateRejected,
};
