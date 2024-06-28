const dotenv = require("dotenv");
dotenv.config();

const _config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN,
};

module.exports = Object.freeze(_config);
