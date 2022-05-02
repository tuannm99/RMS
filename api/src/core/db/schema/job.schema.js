const mongoose = require('mongoose');
const { toJSON, paginate, preDate } = require('./plugins');
const { JOB_STATUS, DEPARTMENTS } = require('../../../constants');

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  candidateId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
  title: { required: true, type: String },
  unsignedTitle: { type: String },
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
      DEPARTMENTS.humanResource,
      DEPARTMENTS.marketing,
      DEPARTMENTS.engineering,
    ],
  },
  jobType: [{ type: String }],
  skill: [{ type: String }],
  location: { type: String },
  jobDescription: { type: String },
  shortDes: { type: String },
  experience: { type: String },
  minSalary: {
    type: Number,
    min: [0, 'Salary be at least 0, got {VALUE}'],
  },
  maxSalary: {
    type: Number,
    validate(value) {
      if (value < this.minSalary) {
        throw new Error('min salary must less than max salary');
      }
    },
  },
  currency: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);
jobSchema.plugin(preDate);

module.exports = mongoose.model('Job', jobSchema);
