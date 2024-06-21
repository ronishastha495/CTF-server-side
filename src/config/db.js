const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDb..");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error while connecting with MongoDb..", err);
    });
    await mongoose.connect(config.databaseUrl);
  } catch (error) {
    console.error("Failed to connect to MongoDb..", error);
    process.exit(1);
  }
};

module.exports = connectDB;
