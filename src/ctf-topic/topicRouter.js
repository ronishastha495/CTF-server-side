const express = require("express");
const { createTopic ,getTopic} = require("./topicController");
const { authenticateToken, isAdmin } = require("../middlewares/authHandle");

const topicRouter = express.Router();

topicRouter.post("/createTopic",authenticateToken, isAdmin, createTopic);
topicRouter.get("/getAllTopic",authenticateToken, isAdmin, getTopic);

module.exports = { topicRouter };
