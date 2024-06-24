require("dotenv").config();
const express = require("express");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const userRouter = require("./users/userRouter");
const ctfRouter = require("./CTF/ctfRouter");
const { topicRouter } = require("./ctfTopic/topicRouter");

const app = express();
app.use(express.json());

// Routes
app.get("/home", (req, res, next) => {
  res.json({ message: "Welcome to Raja.." });
});

app.use("/api/users", userRouter);
app.use("/api/ctf", ctfRouter);
app.use("/api/topic", topicRouter);

app.use(globalErrorHandler);

module.exports = app;
