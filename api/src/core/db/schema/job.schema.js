const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { require: true, type: String },
  department: { require: true, type: String },
  jobType: { require: true, type: String },
  location: { type: String },
  jobDescription: { type: String },
  skill: { type: String },
  experience: { type: String },
  minSalary: { type: Number },
  maxSalary: { type: Number },
  currency: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

module.exports = mongoose.model('Job', jobSchema);
