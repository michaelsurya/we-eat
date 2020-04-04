const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ReviewSchema = require("./review");

const saltRounds = 10;

const GENDERS = ["M", "F"];

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  sex: { type: String, enum: GENDERS},
  date: { type: Date, default: Date.now },
  phoneNumber: { type: String },

  description: { type: String },
  events: {},
  reviews: [ReviewSchema],
  rating: { type: Number },

  languages: [{ type: String }],
  interests: [{ type: String }],

  isVerified: {type:Boolean, default: false}
});

UserSchema.pre("save", function(next) {
  // Check if object is new or a new password has been set
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const object = this;
    bcrypt.hash(object.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        object.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
