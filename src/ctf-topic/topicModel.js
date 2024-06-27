const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists
const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

module.exports = Topic;
