const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ReviewSchema = require("./review");
const ImageSchema = require("./image");

const saltRounds = 10;

const GENDERS = ["M", "F"];

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  sex: { type: String, enum: GENDERS },
  date: { type: Date, default: Date.now },
  phoneNumber: { type: String, select: false },

  profilePict: ImageSchema,

  description: { type: String },
  events: {},
  reviews: [ReviewSchema],
  rating: { type: Number },

  languages: [{ type: String }],
  interests: [{ type: String }],

  isVerified: { type: Boolean, default: false },
  verifiedEmail: { type: Boolean, default: false },
  verifiedPhone: { type: Boolean, default: false },
});

UserSchema.pre("save", function (next) {
  // Check if object is new or a new password has been set
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const object = this;
    bcrypt.hash(object.password, saltRounds, function (err, hashedPassword) {
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

  if (this.isModified("verifiedEmail")) {
    const object = this;
    if(object.verifiedEmail && object.verifiedPhone){
      object.isVerified = true;
      next();
    }
  }
});

// Always executed after findOneAndUpdate query. To check verification
UserSchema.post("findOneAndUpdate", async function () {
  const doc = await this.model.findOne(this.getQuery()).select("+phoneNumber");
  if (doc.phoneNumber !== "") {
    doc.verifiedPhone = true;
  }
  if (doc.verifiedPhone && doc.verifiedEmail) {
    doc.isVerified = true;
  }
  doc.save();
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
