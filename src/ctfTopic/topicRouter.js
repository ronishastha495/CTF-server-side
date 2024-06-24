const express = require("express");
const { createTopic ,getTopic} = require("./topicController");

const topicRouter = express.Router();

topicRouter.post("/createTopic", createTopic);
topicRouter.get("/getAllTopic", getTopic);

module.exports = { topicRouter };
