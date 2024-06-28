const createError = require("http-errors");
const userModel = require("../users/userModel");
const questionModel = require("../questions/questionModel");

const handleProgress = async (req, res, next) => {
  try {
    const { quizId, answer } = req.body;
    const userId = req.user.sub;

    const user = await userModel.findById(userId);
    const quiz = await questionModel.findOne({ "quizzes._id": quizId });

    if (!user || !quiz) {
      const error = createError(400, "User or Quiz not found");
      return next(error);
    }

    const correctQuiz = quiz.quizzes.id(quizId);

    if (correctQuiz.answer === answer) {
      // Check if user already solved the quiz
      const alreadySolved = await UserProgress.findOne({
        user: userId,
        quiz: quizId,
      });

      if (alreadySolved) {
        const error = createError(400, "Quiz already solved");
        return next(error);
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
      const error = createError(400, "Incorrect answer");
      return next(error);
    }
  } catch (error) {
    next(
      createError(
        500,
        `Server Error while Submitting the answer.${error.message}`
      )
    );
  }
};

module.exports = {
  handleProgress,
};
