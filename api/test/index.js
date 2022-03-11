const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
  };
  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Close db connection
 */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Delete db collections
 */
const clearDatabase = async () => {
  const { collections } = mongoose.connection;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

module.exports = { connect, closeDatabase, clearDatabase };
