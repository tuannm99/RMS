// load env
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./router');
const passport = require('./auth/passport');

/**
 * routing config
 * @param app - express instance
 */
const routerMiddleware = (app) => {
  app.use('/api/v1', router);
};

/**
 * middleware config
 * @param app - express instance
 */
const middleware = (app) => {
  app.use(express.json());
  app.use(helmet());
  app.use(morgan('combined'));

  // this middleware should not config like this in production
  app.use(cors({ origin: '*' }));

  // passport
  app.use(passport.initialize());
};

/**
 * initialize express application
 * @return app - express instance
 */
bootstrap = () => {
  const app = express();

  // use middleware
  middleware(app);
  routerMiddleware(app);

  // default route
  app.get('/', (req, res) => {
    res.send({ msg: 'hello world!' });
  });
  return app;
};

module.exports = bootstrap;
