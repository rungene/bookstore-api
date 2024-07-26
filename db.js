const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const localUri = `${process.env.LOCAL_URI}`;
const atlasUri = `${process.env.ATLAS_URI}`;
const testUri = `${process.env.LOCAL_TEST_URI}`;
const env = process.env.NODE_ENV || 'development';
const uri = env === 'test' ? testUri : localUri;

let dbConnection;
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
