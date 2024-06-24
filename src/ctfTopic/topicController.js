const createError = require("http-errors");
const topicModel = require("./topicModel");

const createTopic = async (req, res, next) => {
  const { topic } = req.body;
  if (!topic) {
    const error = createError(400, "Please, Fill the Topic.");
    return next(error);
  }

  try {
    await topicModel.create({
      topic,
    });

    res.status(200).json({
      message: "Topic Added successfully",
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
