const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewTokenSchema = new Schema({
  validStart: {
      type: Date, 
      required: true
  },
  validEnd: {
      type: Date,
      required: true
  },
});

module.exports = ReviewTokenSchema;
