const Event = require('events');

const { EVENTS } = require('./constants');
const logger = require('./core/logger');
const mailService = require('./mail/mail.service');

const emitter = new Event();

/**
 * define all event
 * - using pub/sub pattern for large bussiness logic
 */
function initializeEvent() {
  logger.info('initializeEvent');

  // |---------------- Consumer ------------------------|
  // |__________________________________________________|

  /**
   * consumer for send mail
   */
  emitter.on(EVENTS.sendMail, async (data) => {
    try {
      await mailService.sendEmail(data.to, data.subject, data.text, data.html);
    } catch (e) {
      logger.error(e);
    }
  });

  // define other event here
}

// |---------------- Producer ------------------------|
// |                                                  |
// |__________________________________________________|

/**
 * Producer for send an email
 * @param {Object} data
 * @param {string} data.to
 * @param {string} data.subject
 * @param {string} data.text
 * @param {string} data.html
 */
function sendMailProducer(data) {
  emitter.emit(EVENTS.sendMail, data);
}

module.exports = { initializeEvent, sendMailProducer };
