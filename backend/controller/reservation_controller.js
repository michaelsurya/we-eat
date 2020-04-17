const Event = require("../models/event");
const Reservation = require("../models/reservation");

const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

module.exports = {
  newReservation(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      event: Joi.objectId().required(),
      host: Joi.objectId().required(),
      user: Joi.objectId().required(),
      status: Joi.string().default("pending"),
    });

    const { error, value } = schema.validate(req.body);
    // Check validation, input sanitation
    if (error) {
      res.status(400).json(error.details);
    } else {
      const newReservation = new Reservation(value);
      newReservation
        .save()
        .then((result) =>
          Event.findByIdAndUpdate(
            { _id: result.event },
            {
              $push: { reservation: result._id },
            }
          )
        )
        .then((result) => {
          res.send(result);
        })
        .catch(next);
    }
  },

  editReservation(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      event: Joi.objectId().required(),
      host: Joi.objectId().required(),
      user: Joi.objectId().required(),
      status: Joi.string().valid("confirmed", "rejected").required(),
    });

    const { error, value } = schema.validate(req.body);
    // Check validation, input sanitation
    if (error) {
      res.status(400).json(error.details);
    } else {
      Reservation.findOneAndUpdate(
        { event: value.event, host: value.host, user: value.user },
        { status: value.status }
      ).then((result) => res.send(result));
    }
  },
};
