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
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists
const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

module.exports = Topic;
