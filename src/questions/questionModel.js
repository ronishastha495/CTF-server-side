const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    introduction: { type: String },
    tools: { type: String },
    scenario: { type: String },
    process: { type: String },
    questions: [
      {
        question_text: { type: String, required: true },
        answer: { type: String, required: true },
        hint: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
