const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  solvedAt: { type: Date, default: Date.now },
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

module.exports = UserProgress;
