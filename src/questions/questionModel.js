const mongoose = require("mongoose");

const subQuestionSchema = new mongoose.Schema({
  question_text: String,
  answer: String,
  hint: String,
});

const questionSchema = new mongoose.Schema({
  title: String,
  introduction: String,
  tools: String,
  scenario: String,
  process: String,
  quiz: [subQuestionSchema],
  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
});

const questionModel = mongoose.model("Question", questionSchema);

module.exports = questionModel;
