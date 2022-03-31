// load env
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const morgan = require('./core/morganConfig');
const router = require('./router');
const passport = require('./auth/passport');
const { initEvent } = require('./event');

const { errorConverter, errorHandler } = require('./core/global.middleware');

/**
 * middleware config
 * @param app - express instance
 */
const middleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });
  app.use('/uploads', express.static('uploads'));
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
  initEvent();

  // default route
  app.get('/health-check', (req, res) => {
    res.send({ msg: 'ok' });
  });

  return app;
};

module.exports = bootstrap;
