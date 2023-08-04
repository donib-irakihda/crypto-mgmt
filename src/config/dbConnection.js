const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const conn = {
  test: {
    uri: process.env.MONGO_TEST_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  production: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

const env = process.env.NODE_ENV || "production";

let connectDb;

if (env === "test") {
  connectDb = mongoose
    .connect(conn.test.uri, conn[env].options)
    .then(async () => {
      console.log(`${env} Database Connected`);
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting database!!!.");
    });
} else {
  connectDb = mongoose
    .connect(conn.production.uri, conn[env].options)
    .then(async () => {
      console.log(`${env} Database Connected`);
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting database!!!.");
    });
}

module.exports = connectDb;
