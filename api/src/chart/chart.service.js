const { Job } = require('../core/db/schema');

const countJobByDepartment = async (departmentType) => {
  const jobByDepartment = await Job.find({ department: departmentType });
  return jobByDepartment;
};

module.exports = {
  countJobByDepartment,
};
