const mongoose = require('mongoose');
const envConf = require('../config');
const logger = require('../logger');

const connectDatabase = () => {
  const mongoDbUrl = `${envConf.mongo.url}/${envConf.mongo.db_name}`;

  mongoose.Promise = global.Promise;
  // Connecting to the database
  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info('Successfully connected to the database');
    })
    .catch((err) => {
      logger.error(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit();
    });
};

module.exports = connectDatabase;
