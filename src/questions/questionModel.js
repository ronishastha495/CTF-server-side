const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    introduction: { type: String },
    tools: { type: String },
    scenario: { type: String },
    process: { type: String },
    quiz: [
      {
        question_text: { type: String, required: true },
        answer: { type: String, required: true },
        hint: { type: String },
      },
    ],
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
