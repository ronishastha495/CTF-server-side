const mongoose = require("mongoose");
const createError = require("http-errors");
const ctfModel = require("./ctfModel");
const topicModel = require("../ctf-topic/topicModel");

const createCTF = async (req, res, next) => {
  const {
    topic,
    questionName,
    introduction,
    requirements,
    link,
    begin,
    scenerio,
    question,
    answer,
    points,
    hints,
  } = req.body;

  // Validating
  if (
    !questionName ||
    !introduction ||
    !topic ||
    !requirements ||
    !link ||
    !begin ||
    !scenerio ||
    !question ||
    !answer ||
    !points ||
    !hints
  ) {
    const error = createError(400, "All fields are required.");
    return next(error);
  }

  try {
    const dbTopic = await topicModel.findOne({ topic });
    if (!dbTopic) {
      return next(createError(400, "Topic not found."));
    }
    const topicId = dbTopic._id;
    const createdBy = new mongoose.Types.ObjectId(req.user.sub);

    const questionNameExist = await ctfModel.findOne({ questionName });
    if (questionNameExist) {
      return next(createError(400, "Question Already Exist."));
    }

    const newQuestion = await ctfModel.create({
      topicId,
      questionName,
      introduction,
      requirements,
      link,
      scenerio,
      begin,
      question,
      answer,
      points,
      hints,
      createdBy,
    });
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Question Created successfully",
        Questions: newQuestion,
      },
    });
  } catch (error) {
    next(createError(500, "Server Error while creating new Question."));
  }
};

const getCTF = async (req, res, next) => {
  try {
    const allCTF = await ctfModel.find({});
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Sucessfully fetch all ctf",
        all_Ctf: allCTF,
      },
    });
  } catch (error) {
    next(createError(500, "Server Error while getting CTF."));
  }
};

const getCTFByTopic = async (req, res, next) => {
  const topicId = req.params.id;
  try {
    const allCTFByTopic = await ctfModel.find({
      topicId: new mongoose.Types.ObjectId(topicId),
    });

    if (!allCTFByTopic || allCTFByTopic.length === 0) {
      return next(createError(400, "CTF Topic Not Found."));
    }

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "CTF by topic",
        CTFByTopic: allCTFByTopic,
      },
    });
  } catch (error) {
    next(
      createError(500, "Server Error while getting CTF Questions by Topic.")
    );
  }
};

module.exports = { createCTF, getCTF, getCTFByTopic };
