const express = require("express");
const leaderBoardRouter = express.Router();
const { getLeaderboard } = require("../leaderboard/leaderBoardController");

leaderBoardRouter.get("/", getLeaderboard);

module.exports = leaderBoardRouter;
