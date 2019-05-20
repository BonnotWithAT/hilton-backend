// require("dotenv").config();
const mongoose = require("mongoose");

const db = mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${
    process.env.MONGO_CONTAINER
  }:27017`
);

module.exports = db;