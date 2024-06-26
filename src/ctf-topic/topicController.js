const createError = require("http-errors");
const topicModel = require("./topicModel");
const userModel = require("../users/userModel");

const createTopic = async (req, res, next) => {
  
  const { topic, description } = req.body;
  if (!topic || !description) {
    const error = createError(400, "Please, Fill all the feilds.");
    return next(error);
  }

  const topicExist = await topicModel.findOne({ topic });
  if (topicExist) {
    const error = createError(400, "Topic Already Exist");
    return next(error);
  }

  try {
    await topicModel.create({
      topic,
      description,
    });

    res.status(200).json({
      message: "Topic Added successfully",
      topic: topic,
      description: description,
    });
  } catch (error) {
    next(createError(500, "Server Error while Adding a new Topic"));
  }
};

const getTopic = async (req, res, next) => {
  try {
    const topics = await topicModel.find();
    res.status(200).json(topics);
  } catch (error) {
    next(createError(500, "Server Error while getting the topics"));
  }
};

module.exports = {
  createTopic,
  getTopic,
};
