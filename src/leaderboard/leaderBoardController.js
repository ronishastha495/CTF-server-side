const createError = require("http-errors");
const userModel = require("../users/userModel");

const getLeaderboard = async (req, res, next) => {
  try {
    const topUsers = await userModel
      .find({ role: "user" })
      .sort({ rewards: -1 })
      .limit(3)
      .select("fullname rewards");

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      message: "Sucessfully fetched the leaderboard",
      Result: topUsers,
    });
  } catch (error) {
    next(
      createError(
        500,
        `Server Error while fetching leaderboard. ${error.message}`
      )
    );
  }
};

module.exports = {
  getLeaderboard,
};
