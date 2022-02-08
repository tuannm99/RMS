const mongoose = require('mongoose');
const envConf = require('../config');

const connectDatabase = () => {
  const mongoDbUrl = `mongodb://${envConf.mongo_username}:${envConf.mongo_password}@${envConf.mongo_host}:${envConf.mongo_port}/${envConf.mongo_db_name}`;
  mongoose.Promise = global.Promise;
  // Connecting to the database
  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to the database');
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit();
    });
};

module.exports = connectDatabase;
