const express = require("express");
const { createTopic ,getTopic, getSingleTopic, deleteTopic, updateTopic} = require("./topicController");
const { authenticateToken, isAdmin } = require("../middlewares/authHandle");

const topicRouter = express.Router();


console.log("entered topic router")
topicRouter.post("/createTopic",authenticateToken, isAdmin, createTopic);
topicRouter.get("/getAllTopic", getTopic);
topicRouter.get("/getSingleTopic/:id",authenticateToken, getSingleTopic);
topicRouter.put("/updateTopic/:id",authenticateToken, isAdmin, updateTopic);
topicRouter.delete("/deleteTopic/:id",authenticateToken, isAdmin, deleteTopic);

module.exports =  topicRouter ;
