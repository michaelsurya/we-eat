const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const STATUS = ["confirmed", "pending", "rejected"];

const ReservationSchema = new Schema({
  event: { type: Schema.Types.ObjectId, required: true, ref: "event" },
  host: {type: Schema.Types.ObjectId, required: true, ref: "user"},
  user:  { type: Schema.Types.ObjectId, required: true, ref: "user" },
  status: {type: String, required: true, enum: STATUS},
  reservationDate: {type: Date, required:true, default: Date.now},
  confirmationDate: {type: Date},
});

const Reservation = mongoose.model("reservation", ReservationSchema);

module.exports = Reservation;
