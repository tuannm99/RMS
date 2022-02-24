const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const jobSchema = new mongoose.Schema({
  title: { required: true, type: String },
  department: { required: true, type: String },
  jobType: { required: true, type: String },
  location: { type: String },
  jobDescription: { required: true, type: String },
  skill: { required: true, type: String },
  minSalary: { type: Number },
  maxSalary: { type: Number },
  current: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

module.exports = mongoose.model('Job', jobSchema);
