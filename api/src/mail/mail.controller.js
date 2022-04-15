const httpStatus = require('http-status');
const catchAsync = require('../core/catchAsync');

const eventProducer = require('../event/producer');

/**
 * send mail
 * @param {object} req
 * @param {object} res
 */
const send = catchAsync(async (req, res) => {
  eventProducer.sendMailProducer({
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.html,
  });
  res.status(httpStatus.OK).json({ msg: 'ok!' });
});

module.exports = {
  send,
};
