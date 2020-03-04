const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId },
  date: { type: Date, default: Date.now },
  content: { type: String }
});

module.exports = ReviewSchema;
