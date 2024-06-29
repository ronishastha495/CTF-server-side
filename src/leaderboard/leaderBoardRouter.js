const express = require("express");
const leaderBoardRouter = express.Router();
const { getLeaderboard } = require("../leaderboard/leaderBoardController");

leaderBoardRouter.get("/leaderboard", getLeaderboard);

module.exports = leaderBoardRouter;
