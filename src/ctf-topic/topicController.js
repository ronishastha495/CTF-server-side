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
      createdBy,
    });

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Topic Created successfully",
        Topic: newTopic,
      },
    });
  } catch (error) {
    console.error("Error while adding a new topic:", error);
    next(createError(500, "Server error while adding a new topic"));
  }
};

const getTopic = async (req, res, next) => {
  try {
    const topics = await topicModel.find({});
    const message =
      topics.length >= 0
        ? "Successfully fetched all topics"
        : "No topics were created";

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message,
        Topics: topics,
      },
    });
  } catch (error) {
    next(createError(500, "Server error while fetching the topics"));
  }
};

const getSingleTopic = async (req, res, next) => {
  const { id } = req.params;
  try {
    const topicDetails = await topicModel.findById(id);
    if (topicDetails.length <= 0) {
      return next(createError(404, "Topic details not found"));
    }
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Successfully got single topic",
        Topic: topicDetails,
      },
    });
  } catch (error) {
    next(createError(500, "Server error while getting the topic"));
  }
};

const updateTopic = async (req, res, next) => {
  const { id } = req.params;
  const { topic, description } = req.body;
  const updatedBy = new mongoose.Types.ObjectId(req.user.sub);
  try {
    const updatedTopic = await topicModel.findByIdAndUpdate(
      id,
      { topic, description, updatedBy},
      { new: true }
    );
    if (updatedTopic.length <= 0) {
      return next(createError(404, "Topic details not found"));
    }
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Successfully updated topic",
        Topic: updatedTopic,
      },
    });
  } catch (error) {
    next(createError(500, "Server error while updating the topic"));
  }
};

const deleteTopic = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTopic = await topicModel.findByIdAndDelete(id);
    if (deletedTopic.length <= 0) {
      return next(createError(404, "Topic details not found"));
    }
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Successfully deleted topic",
        Topic: deletedTopic,
      },
    });
  } catch (error) {
    next(createError(500, "Server error while deleting the topic"));
  }
};

module.exports = {
  createTopic,
  getTopic,
  getSingleTopic,
  updateTopic,
  deleteTopic,
};
