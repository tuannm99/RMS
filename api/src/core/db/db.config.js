const mongoose = require('mongoose');
const envConf = require('../config');
const logger = require('../logger');

const connectDatabase = (dbName) => {
  const mongoDbUrl = `${envConf.mongo.url}/${dbName}`;

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
