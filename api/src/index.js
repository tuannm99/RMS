// load env
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const morgan = require('./core/morganConfig');
const router = require('./router');
const passport = require('./auth/passport');
const { initializeEvent } = require('./events');

const { errorConverter, errorHandler } = require('./core/global.middleware');

/**
 * middleware config
 * @param app - express instance
 */
const middleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);

  // this middleware should not config like this in production
  app.use(cors({ origin: '*' }));

  // passport
  app.use(passport.initialize());

  // router
  app.use('/api/v1', router);

  // convert error to ApiError, if needed
  app.use(errorConverter);
  // handle error
  app.use(errorHandler);
};

/**
 * initialize express application
 * @return app - express instance
 */
const bootstrap = () => {
  const app = express();

  // use middleware
  middleware(app);

  // event
  initializeEvent();

  // default route
  app.get('/health-check', (req, res) => {
    res.send({ msg: 'ok' });
  });

  return app;
};

module.exports = bootstrap;
