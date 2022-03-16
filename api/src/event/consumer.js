const emitter = require('./events');
const { EVENTS } = require('../constants');
const logger = require('../core/logger');
const mailService = require('../mail/mail.service');

function sendMailConsumer() {
  emitter.on(EVENTS.sendMail, async (data) => {
    try {
      await mailService.sendEmail(data.to, data.subject, data.text, data.html);
    } catch (e) {
      logger.error(e);
    }
  });
}

const initializeEvent = () => {
  logger.info('initializeEvent');

  sendMailConsumer();
};

module.exports = initializeEvent;
