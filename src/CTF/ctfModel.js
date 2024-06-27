const mongoose = require("mongoose");
const ctfModelSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    questionName: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    scenerio: {
      type: String,
      required: true,
    },
    begin: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    hints: {
      type: String,
      required : true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

const ctfModel = mongoose.model("ctf", ctfModelSchema);

module.exports = ctfModel;
