require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./middlewares/globalErrorHandler");
const userRouter = require("./users/userRouter");
const ctfRouter = require("./ctf/ctfRouter");
const topicRouter = require("./ctf-topic/topicRouter");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.get("/home", (req, res, next) => {
  res.json({ message: "Welcome to CTF.." });
});

app.use("/api/users", userRouter);
app.use("/api/ctf", ctfRouter);
app.use("/api/topic", topicRouter);

app.use(globalErrorHandler);

module.exports = app;
