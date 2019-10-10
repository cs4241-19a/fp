const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  quid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  upvote: {
    type: Number,
    required: true
  },
  code: {
  type: String,
  required: true
  }
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
