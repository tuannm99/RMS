const mongoose = require('mongoose');
const bootstrap = require('../src');
const connectDatabase = require('../src/core/db/db.config');

// expressjs instance
exports.testApp = bootstrap();

exports.prepareTest = () => {
  beforeAll(async () => {
    connectDatabase(process.env.MONGO_DB_TEST);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
};
