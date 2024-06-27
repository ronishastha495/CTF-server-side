const express = require("express");
const {
  isAdmin,
  isUser,
  verifyUserId,
  authenticateToken,
} = require("../middlewares/authHandle");

const {
  createQuestionSet,
  getAllQuestion,
  updateQuestionSet,
  deleteQuestionSet,
} = require("./questionController");

const questionRouter = express.Router();
questionRouter.post(
  "/create",
  authenticateToken,
  isAdmin,
  createQuestionSet
);
questionRouter.get(
  "/getAllQuestion",
  authenticateToken,
  isAdmin,
  getAllQuestion
);
questionRouter.post(
  "/update/:id",
  authenticateToken,
  isAdmin,
  updateQuestionSet
);
questionRouter.delete(
  "/delete/:id",
  authenticateToken,
  isAdmin,
  deleteQuestionSet
);

module.exports = questionRouter;
