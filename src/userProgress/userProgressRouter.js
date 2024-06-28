const express = require("express");
const { isUser, authenticateToken } = require("../middlewares/authHandle");
const { handleProgress } = require("./userProgressController");
const userProgressRouter = express.Router();

userProgressRouter.delete(
  "/submitAnswer/:quizId",
  authenticateToken,
  isUser,
  handleProgress
);

module.exports = userProgressRouter;
