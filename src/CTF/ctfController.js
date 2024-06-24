const mongoose = require('mongoose');
const createError = require("http-errors");
const ctfModel = require("./ctfModel");
const topicModel = require("../ctf-topic/topicModel");

const createCTF = async (req, res, next) => {
    const { topic, introduction, requirements, link, begin, scenerio, question, answer,points } = req.body;

    // Validating
    if (!introduction || !topic || !requirements || !link || !begin || !scenerio || !question || !answer || !points) {
        const error = createError(400, "All fields are required.");
        return next(error);
    }

    try {
        // Finding the topic id
        const dbTopic = await topicModel.findOne({ topic });
        if (!dbTopic) {
            return next(createError(400, "Topic not found."));
        }
        //GET ID
        const topicId = dbTopic._id;

        await ctfModel.create({
            topicId,
            introduction,
            requirements,
            link,
            scenerio,
            begin,
            question,
            answer,
            points,
        });

        res.status(200).json({
            message: "Question Created successfully"
        });
    } catch (error) {
        next(createError(500, "Server Error while creating new Question."));
    }
};

const getCTF =async (req, res, next) => {
    try {
        const allCTF = await ctfModel.find();
        res.status(200).json(allCTF);
    } catch (error) {
        next(createError(500, "Server Error while getting CTF."));
    }
};

const getCTFByTopic = async (req, res, next) => {
    const topicId = req.params.id;
    console.log("Received topicId:", topicId);
    try {
        //coverting to object id to ensure that matching id in mango db
        const allCTFByTopic = await ctfModel.find({ topicId: new mongoose.Types.ObjectId(topicId)});
       
        if (!allCTFByTopic || allCTFByTopic.length === 0) {
            return next(createError(400, "CTF Topic Not Found."));
        }

        res.status(200).json(allCTFByTopic);
    } catch (error) {
        console.error("Error during database query:", error);
        next(createError(500, "Server Error while getting CTF Questions by Topic."));
    }
};


module.exports = { createCTF , getCTF, getCTFByTopic};
