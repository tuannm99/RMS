// load env
import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

// db
import connectDatabase from './core/db/db.config.js';
import passport from './auth/passport/index.js';
import envConf from './core/config/index.js';
import router from './router.js';

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
const bootstrap = () => {
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

connectDatabase();

const port = envConf.node_port || 5000;

// running
bootstrap().listen(port, () => {
  console.log(`app running on port ${port}`);
});
