const createError = require("http-errors");
const userModel = require("../users/userModel");
const questionModel = require("../questions/questionModel");
const UserProgress = require("./userProgressModel");

const getPoints = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return 1;
    case "Medium":
      return 2;
    case "Hard":
      return 3;
    case "Advanced":
      return 5;
    default:
      return 0;
  }
};

const handleProgress = async (req, res, next) => {
  try {
    const { quizId, answer } = req.body;
    const userId = req.user.sub;

    const user = await userModel.findById(userId);
    if (!user) {
      return next(createError(403, "User Not Found"));
    }

    const questions = await questionModel
      .findOne({ "quiz._id": quizId })
      .populate("topic");
    if (!questions) {
      return next(createError(400, "Quiz not found"));
    }

    const quizQuestion = questions.quiz.find(
      (q) => q._id.toString() === quizId
    );

    if (!quizQuestion) {
      return next(createError(400, "Quiz question not found"));
    }

    const alreadySolved = await UserProgress.findOne({
      user: userId,
      quiz: quizId,
    });

    if (alreadySolved) {
      return next(createError(400, "Quiz already solved"));
    }

    if (quizQuestion.answer === answer) {
      const userProgress = new UserProgress({ user: userId, quiz: quizId });
      await userProgress.save();

      const points = getPoints(questions.topic.difficulty);
      user.solvedQuizzes.push(quizId);
      user.rewards += points;

      await user.save();

      res.status(200).json({
        StatusCode: 200,
        IsSuccess: true,
        ErrorMessage: [],
        Result: {
          message: "Quiz solved successfully",
          points: points,
          Quiz: quizQuestion,
        },
      });
    } else {
      return next(createError(400, "Incorrect answer"));
    }
  } catch (error) {
    next(
      createError(
        500,
        `Server Error while Submitting the answer. ${error.message}`
      )
    );
  }
};

module.exports = {
  handleProgress,
};
