const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { statusCandidate } = require('../../../constants');

const candidateSchema = new mongoose.Schema({
  title: { required: true, type: String },
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
  cv: { type: String },
  statusCandidate: {
    type: String,
    enum: [statusCandidate.reject, statusCandidate.open, statusCandidate.approve],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

candidateSchema.plugin(toJSON);
candidateSchema.plugin(paginate);

module.exports = mongoose.model('Candidate', candidateSchema);
