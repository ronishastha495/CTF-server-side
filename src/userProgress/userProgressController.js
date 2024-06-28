const createError = require("http-errors");
const userModel = require("../users/userModel");
const questionModel = require("../questions/questionModel");
const UserProgress = require("./userProgressModel");

const getPoints = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return 10;
    case "medium":
      return 20;
    case "hard":
      return 30;
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

    const questions = await questionModel.findOne({ "quiz._id": quizId });

    if (!questions) {
      return next(createError(400, "Quiz not found"));
    }
    console.log(quiz);

    const question = questions.quiz._id(quizId);

    console.log("ok"+question);

    if (!question) {
      return next(createError(400, "Quiz question not found"));
    }

    if (question.answer === answer) {
      const alreadySolved = await UserProgress.findOne({
        user: userId,
        quiz: quizId,
      });

      if (alreadySolved) {
        return next(createError(400, "Quiz already solved"));
      }

      // Save user progress
      const userProgress = new UserProgress({ user: userId, quiz: quizId });
      await userProgress.save();

      // Update user rewards
      const points = getPoints(quiz.topic.difficulty);
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
          Quiz: quiz,
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
