const createError = require("http-errors");
const questionModel = require("./questionModel");

const createQuestionSet = async (req, res, next) => {
    const { title, introduction, tools, scenario, process, questions } = req.body;
    if (!title || !questions) {
      const error = createError(400, "Title and questions are required.");
      return next(error);
    }
  
    try {
      const existingTitle = await questionModel.findOne({ title });
      if (existingTitle) {
        const error = createError(400, "Title already exists.");
        return next(error);
      }
    } catch (error) {
      return next(createError(500, "Server Error while checking for existing title."));
    }
  
    try {
      const existingIntroduction = await questionModel.findOne({ introduction });
      if (existingIntroduction) {
        const error = createError(400, "Introduction already exists.");
        return next(error);
      }
    } catch (error) {
      return next(createError(500, "Server Error while checking for existing introduction."));
    }
  
    try {
      const newQuestionSet = new questionModel({
        title,
        introduction,
        tools,
        scenario,
        process,
        questions,
      });
      const data = await newQuestionSet.save();
      res.status(200).json({
        StatusCode: 200,
        IsSuccess: true,
        ErrorMessage: [],
        Result: {
          message: "Question Set Created successfully",
          QuestionSet: data,
        },
      });
    } catch (error) {
      next(createError(500, "Server Error while creating new QuestionSet."));
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
    next(createError(500, "Server Error while updating question."));
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
    next(createError(500, "Server Error while deleting question."));
  }
};

module.exports = {
  createQuestionSet,
  getAllQuestion,
  updateQuestionSet,
  deleteQuestionSet,
};
