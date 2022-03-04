const mongoose = require('mongoose');

// // expressjs instance
// exports.testApp = bootstrap();

exports.prepareTest = () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://userdeptrai:12345678@rms-fpt.ddns.net:27017/RMS_TEST', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    const { db } = mongoose.connection;
    // Get all collections
    const collections = await db.listCollections().toArray();

    // Create an array of collection names and drop each collection
    collections
      .map((collection) => collection.name)
      .forEach(async (collectionName) => {
        db.dropCollection(collectionName);
      });
    await mongoose.connection.close();
  });
};
