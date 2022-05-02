const emitter = require('./events');
const { EVENTS } = require('../constants');

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

function deleteJob(job) {
  emitter.emit('DELETE_JOB', job);
}

module.exports = { deleteJob, sendMailProducer };
