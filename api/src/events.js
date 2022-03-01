const Event = require('events');

const { EVENTS } = require('./constants');
const logger = require('./core/logger');
const mailService = require('./mail/mail.service');

const emitter = new Event();

/**
 * define all event
 */
function initializeEvent() {
  logger.info('initializeEvent');

  emitter.on(EVENTS.sendMail, async (data) => {
    try {
      await mailService.testSendMail(data.to);
    } catch (e) {
      logger.error(e);
    }
  });

  // define other event here
}

/**
 * send email handler
 */
function sendMail(to) {
  emitter.emit(EVENTS.sendMail, { msg: 'nice to meet u', to });
}

module.exports = { initializeEvent, sendMail };
