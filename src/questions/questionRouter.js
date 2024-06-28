const express = require("express");
const { isAdmin, authenticateToken } = require("../middlewares/authHandle");

const {
  createQuestionSet,
  getAllQuestion,
  getSingleQuestion,
  updateQuestionSet,
  deleteSubQuestion,
  deleteQuestionSet,
} = require("./questionController");

const questionRouter = express.Router();

questionRouter.post("/create", authenticateToken, isAdmin, createQuestionSet);
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
questionRouter.delete(
  "/delete/questions/:questionId/subQuestions/:subQuestionId",
  authenticateToken,
  isAdmin,
  deleteSubQuestion
);
questionRouter.get(
  "/getQuestion/:id",
  authenticateToken,
  isAdmin,
  getSingleQuestion
);

module.exports = questionRouter;
