const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = require("./image");
const MenuSchema = require("./menu");
const PointSchema = require("./pointSchema");

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
  address: { type: String, required: true, select: false },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postcode: { type: String, required: true, select: false },
  location: { type: PointSchema, required: true, select: false },
  date: { type: Date, required: true },
  time: { type: Number, required: true, min: 0, max: 86400 },
  duration: { type: String },
  guestRequired: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  cuisine: [{ type: String, enum: CUISINES }],
  allergen: [{ type: String, enum: ALLERGENS }],
  menu: [MenuSchema],

  pictures: [ImageSchema],

  host: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  reservation: [
    { type: Schema.Types.ObjectId, required: true, ref: "reservation" },
  ],
});

EventSchema.index({location: "2dsphere"})

const Event = mongoose.model("event", EventSchema);

module.exports = Event;
