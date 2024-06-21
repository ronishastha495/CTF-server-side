const dotenv = require("dotenv");
dotenv.config();

const _config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGO_URI,
};

module.exports = Object.freeze(_config);
