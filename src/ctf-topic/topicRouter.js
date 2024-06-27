const express = require("express");
const { createTopic ,getTopic, getSingleTopic, deleteTopic} = require("./topicController");
const { authenticateToken, isAdmin } = require("../middlewares/authHandle");

const topicRouter = express.Router();

topicRouter.post("/createTopic",authenticateToken, isAdmin, createTopic);
topicRouter.get("/getAllTopic",authenticateToken, isAdmin, getTopic);
topicRouter.get("/getSingleTopic/:id",authenticateToken, isAdmin, getSingleTopic);
topicRouter.delete("/DeleteTopic/:id",authenticateToken, isAdmin, deleteTopic);


module.exports =  topicRouter ;
