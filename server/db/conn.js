const DBName = "pizzas_with_ingredients";

const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        console.log("Mongo cloud error");
        return callback(err);
      }

      dbConnection = db.db(DBName);
      console.log("Mongo cloud connected");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
