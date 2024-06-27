const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const userModel = require("../users/userModel");
const config = require("../config/config");

const authenticateToken = (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return next(createError(401, "Refresh Token not found"));
  }

  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return next(createError(401, "Access Denied!"));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(createError(401, "Token is not valid"));
  }

  try {
    const verified = jwt.verify(token, config.jwtSecret);
    req.user = verified;
    next();
  } catch (err) {
    next(createError(400, "Invalid Token"));
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.sub);
    if (!user || user.role !== "admin") {
      return next(createError(403, "You are not admin."));
    }
    next();
  } catch (err) {
    next(createError(500, "Server Error"));
  }
};

const verifyUserId = (req, res, next) => {
  const userId = req.params.id;
  if (req.user.sub !== userId) {
    return next(createError(403, "Access Denied. User ID does not match."));
  }
  next();
};

const isUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.sub);
    if (!user || user.role !== "user") {
      return next(createError(403, "Access Denied"));
    }
    next();
  } catch (err) {
    next(createError(500, "Server Error"));
  }
};

module.exports = { authenticateToken, isAdmin, isUser, verifyUserId };
