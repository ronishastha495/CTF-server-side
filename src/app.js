require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./middlewares/globalErrorHandler");
const userRouter = require("./users/userRouter");
const topicRouter = require("./ctf-topic/topicRouter");
const questionRouter = require("./questions/questionRouter");
const UserProgress = require("./userProgress/userProgressRouter");
const leaderBoardRouter = require("./leaderboard/leaderBoardRouter");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", leaderBoardRouter);
app.use("/api/users", userRouter);
app.use("/api/topic", topicRouter);
app.use("/api/question", questionRouter);
app.use("/api/track", UserProgress);

app.use(globalErrorHandler);

module.exports = app;
