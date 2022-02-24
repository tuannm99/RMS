const mongoose = require('mongoose');
const bootstrap = require('../src');

const connectDatabase = require('../src/core/db/db.config');

// expressjs instance
exports.testApp = bootstrap();

exports.prepareTest = () => {
  beforeAll((done) => {
    connectDatabase();
    done();
  });

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });
};
