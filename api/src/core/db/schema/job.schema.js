const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { JOB_STATUS, DEPARTMENTS } = require('../../../constants');

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  candidateId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
  title: { required: true, type: String },
  status: {
    type: String,
    enum: [JOB_STATUS.published, JOB_STATUS.onHold, JOB_STATUS.deleted],
    default: JOB_STATUS.onHold,
  },
  department: {
    // required: true,
    type: String,
    enum: [
      DEPARTMENTS.administration,
      DEPARTMENTS.sale,
      DEPARTMENTS.finance,
      DEPARTMENTS.humanResources,
      DEPARTMENTS.marketing,
      DEPARTMENTS.engineering,
    ],
  },
  jobType: { required: true, type: String },
  location: { type: String },
  jobDescription: { type: String },
  skill: { type: String },
  experience: { type: String },
  minSalary: { type: Number, default: 0 },
  maxSalary: { type: Number, default: 0 },
  currency: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

module.exports = mongoose.model('Job', jobSchema);
