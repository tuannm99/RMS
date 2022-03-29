const mongoose = require('mongoose');
const { toJSON, paginate, preDate } = require('./plugins');
const { FEEDBACK, STAGES } = require('../../../constants');

const interviewSchema = new mongoose.Schema({
  interviewer: { type: mongoose.Types.ObjectId, ref: 'User' },
  candidateId: { type: mongoose.Types.ObjectId, ref: 'Candidate' },
  scheduleBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  feedback: {
    overallRecommendation: {
      required: true,
      type: String,
      enum: [
        FEEDBACK.hire,
        FEEDBACK.noHire,
        FEEDBACK.strongHire,
        FEEDBACK.strongNoHire,
        FEEDBACK.notYet,
      ],
      default: FEEDBACK.notYet,
    },
    rate: { type: Number, enum: [0, 1, 2, 3, 4, 5], default: 0 }, // 0 -> 5 star
    comment: { type: String },
  },
  stage: {
    type: String,
    enum: [STAGES.contact, STAGES.cultureFit, STAGES.technical, STAGES.test],
    default: STAGES.contact,
  },
  interviewDate: { required: true, type: Date },
  duration: { required: true, type: Number },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

interviewSchema.plugin(toJSON);
interviewSchema.plugin(paginate);
interviewSchema.plugin(preDate);

module.exports = mongoose.model('Interview', interviewSchema);
