const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateAccessToken = (userId) => {
  return jwt.sign({ sub: userId }, config.jwtSecret, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ sub: userId }, config.refreshTokenSecret, {
    expiresIn: "7d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
