const express = require("express");
const { isUser, authenticateToken } = require("../middlewares/authHandle");
const { handleProgress } = require("./userProgressController");
const userProgressRouter = express.Router();

userProgressRouter.post(
  "/submitAnswer/",
  authenticateToken,
  isUser,
  handleProgress
);

module.exports = userProgressRouter;
