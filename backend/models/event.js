const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = require("./image");

const CUISINES = [
  "African",
  "American",
  "British",
  "Caribbean",
  "Chinese",
  "East European",
  "French",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Korean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "South-East Asian",
  "Spanish",
  "Thai",
  "Turkish",
];
const ALLERGENS = [
  "Celery",
  "Gluten",
  "Crustaceans",
  "Eggs",
  "Fish",
  "Lupin",
  "Milk",
  "Molluscs",
  "Mustard",
  "Nuts",
  "Peanuts",
  "Sesame Seeds",
  "Soya",
  "Sulphites",
];

const EventSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: String },
  guestRequired: { type: Number, required: true },
  description: { type: String, required: true },
  cuisine: [{ type: String, enum: CUISINES }],
  allergen: [{ type: String, enum: ALLERGENS }],

  pictures: [ImageSchema],

  host: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const Event = mongoose.model("event", EventSchema);

module.exports = Event;
