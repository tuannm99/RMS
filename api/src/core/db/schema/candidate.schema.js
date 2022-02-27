const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const candidateSchema = new mongoose.Schema({
  title: { required: true, type: String },
  firstName: { type: String },
  midName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  hyperlink: { type: String },
  degree: { type: String },
  schoolName: { type: String },
  fieldOfStudy: { type: String },
  grade: { type: String },
  timeStudy: { type: String },
  source: { type: String },
  sourceCategory: { type: String },
  CV: {},
  statusCandidate: {},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

candidateSchema.plugin(toJSON);
candidateSchema.plugin(paginate);

module.exports = mongoose.model('Candidate', candidateSchema);
