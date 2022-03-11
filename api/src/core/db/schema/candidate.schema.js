const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { STAGES, CANDIDATE_STATUS } = require('../../../constants');

const candidateSchema = new mongoose.Schema({
  jobId: { type: mongoose.Types.ObjectId, ref: 'Job' },
  interviewId: [{ type: mongoose.Types.ObjectId, ref: 'Interview' }],
  status: {
    type: String,
    enum: [CANDIDATE_STATUS.reject, CANDIDATE_STATUS.open, CANDIDATE_STATUS.approve],
    default: CANDIDATE_STATUS.open,
  },
  stage: {
    type: String,
    enum: [STAGES.contact, STAGES.cultureFit, STAGES.technical, STAGES.test],
    default: STAGES.contact,
  },
  firstName: { type: String },
  midName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  phone: { type: Number },
  resume: {
    cv: { type: String },
    hyperlink: { type: String },
    employer: {
      designation: { type: String },
      bussinessName: { type: String },
      from: { type: Date },
      to: { type: Date },
      summary: { type: String },
    },
    education: {
      degree: { type: String },
      universityName: { type: String },
      fieldOfStudy: { type: String },
      grade: { type: String },
      from: { type: Date },
      end: { type: Date },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

candidateSchema.plugin(toJSON);
candidateSchema.plugin(paginate);

module.exports = mongoose.model('Candidate', candidateSchema);
