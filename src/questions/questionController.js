const createError = require("http-errors");
const questionModel = require("./questionModel");
const topicModel = require("../ctf-topic/topicModel");

const createQuestionSet = async (req, res, next) => {
  const { title, introduction, tools, scenario, process, quiz, topic } = req.body;

  // Validate required fields
  if (!title || !quiz || !topic) {
    const error = createError(400, "Title, Questions, and Topic are required.");
    return next(error);
  }

  try {
    // Check if title already exists
    const existingTitle = await questionModel.findOne({ title });

    if (existingTitle) {
      const error = createError(400, "Title already exists.");
      return next(error);
    }

    // Check if introduction already exists
    const existingIntroduction = await questionModel.findOne({ introduction });
    if (existingIntroduction) {
      const error = createError(400, "Introduction already exists.");
      return next(error);
    }

    // Check if topic exists
    const dbTopic = await topicModel.findOne({ topic });

    if (!dbTopic) {
      return next(createError(400, "Topic not found."));
    }
    
    // Create new question set
    const newQuestionSet = await questionModel.create({
      title,
      introduction,
      tools,
      scenario,
      process,
      quiz,
      topic: dbTopic._id,
    });

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Question Set Created successfully",
        QuestionSet: newQuestionSet,
      },
    });
  } catch (error) {
    next(createError(500, `Server Error while creating new QuestionSet: ${error.message}`));
  }
};


const getAllQuestion = async (req, res, next) => {
  try {
    const allQuestion = await questionModel.find({});
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Successfully fetched all questions",
        questions: allQuestion,
      },
    });
  } catch (error) {
    next(createError(500, "Server Error while fetching all questions."));
  }
};

const updateQuestionSet = async (req, res, next) => {
  const { id } = req.params;
  const { title, introduction, tools, scenario, process, questions } = req.body;
  if (!title || !questions) {
    const error = createError(400, "Title and questions are required.");
    return next(error);
  }
  try {
    const question = await questionModel.findByIdAndUpdate(
      id,
      {
        title,
        introduction,
        tools,
        scenario,
        process,
        questions,
      },
      { new: true }
    );
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Question Updated successfully",
        Question: question,
      },
    });
  } catch (error) {
    next(createError(500,`Server Error while updating question: ${error.message}`));
  }
};

const deleteQuestionSet = async (req, res, next) => {
  const { id } = req.params;
  try {
    const question = await questionModel.findByIdAndDelete(id);
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Question Deleted successfully",
        Question: question,
      },
    });
  } catch (error) {
    next(createError(500, `Server Error while deleting question: ${error.message}`));
  }
};

const deleteSubQuestion = async (req, res, next) => {
  const questionId = req.params.questionId;
  const subQuestionId = req.params.subQuestionId;

  try {
    // Find the parent question by ID
    const question = await questionModel.findById(questionId);

    if (!question) {
      return next(createError(404, 'Question not found.'));
    }

    const subQuestionIndex = question.questions.findIndex(
      (q) => q._id.toString() === subQuestionId
    );

    if (subQuestionIndex === -1) {
      return next(createError(404, 'Sub-question not found.'));
    }

    question.questions.splice(subQuestionIndex, 1);

    await question.save();

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: 'Sub-question deleted successfully',
      },
    });
  } catch (error) {
    next(createError(500, `Server Error while deleting sub-question.${error.message}`));
  }
};

const getSingleQuestion = async (req, res, next) => {
  const { id } = req.params;
  try {
    const question = await questionModel.findById(id);
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Question Fetched successfully",
        Question: question,
      },
    });
  } catch (error) {
    next(createError(500, `Server Error while Fetching the question: ${error.message}`));
  }
};

module.exports = {
  createQuestionSet,
  getAllQuestion,
  updateQuestionSet,
  deleteQuestionSet,
  getSingleQuestion,
  deleteSubQuestion
};
