import mongoose from 'mongoose';
import envConf from '../config/index.js';

const connectDatabase = () => {
  const mongoDbUrl = `mongodb://${envConf.mongo_username}:${envConf.mongo_password}@${envConf.mongo_host}:${envConf.mongo_port}/${envConf.mongo_db_name}`;

  //const mongoDbUrlNonUser = `mongodb://${envConf.mongo_host}:${envConf.mongo_port}/${envConf.mongo_db_name}`;
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

export default connectDatabase;
