require("dotenv").config();
const express = require("express");
const cors = require("cors");

const globalErrorHandler = require("./middlewares/globalErrorHandler");
const userRouter = require("./users/userRouter");
const ctfRouter = require("./ctf/ctfRouter");
const { topicRouter } = require("./ctf-topic/topicRouter");

const app = express();
app.use(cors());
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
