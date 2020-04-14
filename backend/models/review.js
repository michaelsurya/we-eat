const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  date: { type: Date, default: Date.now },
  content: { type: String },
});

module.exports = ReviewSchema;
