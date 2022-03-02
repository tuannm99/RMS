const nodemailer = require('nodemailer');
const config = require('../core/config');
const logger = require('../core/logger');

const transport = nodemailer.createTransport(config.email.smtp);
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, html) => {
  const msg = { from: config.email.from, to, subject, text, html };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const testSendMail = async (to) => {
  const subject = 'Test Mail';
  const content = 'Hello';
  const html = ``;
  await sendEmail(to, subject, content, html);
};

module.exports = {
  transport,
  sendEmail,
  testSendMail,
};
