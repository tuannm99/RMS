const emitter = require('./events');
const { EVENTS } = require('../constants');
const logger = require('../core/logger');
const mailService = require('../mail/mail.service');
const { Candidate, Interview } = require('../core/db/schema');

function sendMailConsumer() {
  emitter.on(EVENTS.sendMail, async (data) => {
    try {
      await mailService.sendEmail(data.to, data.subject, data.text, data.html);
    } catch (e) {
      logger.error(e);
    }
  });
}

function deleteJobConsumer() {
  emitter.on('DELETE_JOB', async (job) => {
    try {
      const candidateIds = job.candidateId;
      await Candidate.deleteMany({ _id: candidateIds });
      await Interview.deleteMany({ candidateId: candidateIds });
    } catch (e) {
      logger.error(e);
    }
  });
}

const initializeEvent = () => {
  if (process.env.NODE_ENV !== 'test') {
    logger.info('initializeEvent');
  }

  sendMailConsumer();
  deleteJobConsumer();
};

module.exports = initializeEvent;
