const morgan = require('morgan');
const moment = require('moment');
const config = require('./config');
const logger = require('./logger');

morgan.token('message', (req, res) => res.locals.errorMessage || '');
morgan.token('mydate', () => moment().format('MM ddd,YYYY hh:mm:ss a'));

const getIpFormat = () => (config.node_env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = ` ${getIpFormat()}:remote-user [:mydate] :method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:remote-user [:mydate] :method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
