const { Job } = require('../core/db/schema');

const countJobByDepartment = async () => {
  const jobByDepartment = await Job.find({});

  const sale = jobByDepartment.filter((item) => item.department === 'sale');
  const administration = jobByDepartment.filter((item) => item.department === 'administration');
  const finance = jobByDepartment.filter((item) => item.department === 'finance');
  const humanResource = jobByDepartment.filter((item) => item.department === 'humanResources');
  const marketing = jobByDepartment.filter((item) => item.department === 'marketing');
  const engineering = jobByDepartment.filter((item) => item.department === 'engineering');
  const chartData = [];
  chartData.push(
    { type: 'sale', value: sale.length },
    { type: 'administration', value: administration.length },
    { type: 'finance', value: finance.length },
    { type: 'humanResource', value: humanResource.length },
    { type: 'marketing', value: marketing.length },
    { type: 'engineering', value: engineering.length }
  );

  return chartData;
};

module.exports = {
  countJobByDepartment,
};
