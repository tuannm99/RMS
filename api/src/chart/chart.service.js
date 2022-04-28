const { Job, User, Candidate } = require('../core/db/schema');

const countJobByDepartment = async () => {
  // const jobByDepartment = await Job.find({});

  /**
   * db.jobs.aggregate({$group: {_id: "$department", "count": { $sum: 1 }}})
   * .projection({_id: 0, "department": "$_id", "count": "$count"})
   */
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

  // const sale = jobByDepartment.filter((item) => item.department === 'sale');
  // const administration = jobByDepartment.filter((item) => item.department === 'administration');
  // const finance = jobByDepartment.filter((item) => item.department === 'finance');
  // const humanResource = jobByDepartment.filter((item) => item.department === 'humanResources');
  // const marketing = jobByDepartment.filter((item) => item.department === 'marketing');
  // const engineering = jobByDepartment.filter((item) => item.department === 'engineering');
  // const chartData = [];
  // chartData.push(
  //   { type: 'sale', value: sale.length },
  //   { type: 'administration', value: administration.length },
  //   { type: 'finance', value: finance.length },
  //   { type: 'humanResource', value: humanResource.length },
  //   { type: 'marketing', value: marketing.length },
  //   { type: 'engineering', value: engineering.length }
  // );

  return jobByDepartment;
};
const countSex = async () => {
  const sex = await User.find({});

  const male = sex.filter((item) => item.sex === 'male');
  const female = sex.filter((item) => item.sex === 'female');
  const other = sex.filter((item) => item.sex === 'other');
  const chartData = [];
  chartData.push(
    { type: 'male', value: male.length },
    { type: 'female', value: female.length },
    { type: 'other', value: other.length }
  );

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
  countCandidate,
  countCandidateApproved,
  countCandidateRejected,
};
