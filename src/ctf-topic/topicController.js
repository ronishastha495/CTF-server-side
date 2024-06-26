const mongoose = require("mongoose");
const createError = require("http-errors");
const topicModel = require("./topicModel");

const createTopic = async (req, res, next) => {
  const { topic, description } = req.body;
  if (!topic || !description) {
    const error = createError(400, "Please, fill all the fields.");
    return next(error);
  }

  try {
    const topicExist = await topicModel.findOne({ topic });
    if (topicExist) {
      const error = createError(400, "Topic already exists.");
      return next(error);
    }

    const createdBy = new mongoose.Types.ObjectId(req.user.sub);

    const newTopic = await topicModel.create({
      topic,
      description,
      createdBy
    });

    res.status(200).json({
      message: "Topic Created successfully",
      newTopic
    });
  } catch (error) {
    console.error("Error while adding a new topic:", error);
    next(createError(500, "Server error while adding a new topic"));
  }
};

const getTopic = async (req, res, next) => {
  try {
    const topics = await topicModel.find();
    res.status(200).json(topics);
  } catch (error) {
    console.error("Error while getting topics:", error);
    next(createError(500, "Server error while getting the topics"));
  }
};

module.exports = {
  createTopic,
  getTopic,
};
