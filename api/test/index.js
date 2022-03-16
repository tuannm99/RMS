process.env.SECRET = 'super-secrect-token';

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
  const { db } = mongoose.connection;
  // Get all collections
  const collections = await db.listCollections().toArray();

  // Create an array of collection names and drop each collection
  collections
    .map((collection) => collection.name)
    .forEach(async (collectionName) => {
      db.dropCollection(collectionName);
    });
};

module.exports = { connect, closeDatabase, clearDatabase };
