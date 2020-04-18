const Event = require("../models/event");
const Reservation = require("../models/reservation");

const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
Joi.objectId = require("joi-objectid")(Joi);

const filter = require("lodash/filter");

const nodemailer = require("nodemailer");

module.exports = {
  async newReservation(req, res, next) {
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
      //Initial check
      if (!await canEventBeBooked(value.event)) {
        return res
          .status(400)
          .send({ message: "Reservation could not be completed" });
      }

      const newReservation = new Reservation(value);
      newReservation
        .save()
        .then((result) =>
          //Sync the newly saved reservation with the event data
          Event.findByIdAndUpdate(
            { _id: result.event },
            {
              $push: { reservation: result._id },
            }
          )
        )
        .then(() =>
          //Find the reservation details and populate with the host and user data
          Reservation.findById(newReservation._id)
            .populate("host")
            .populate("user")
        )
        .then((reservation) => {
          // Prepare nodemailer transporter
          let transporter = nodemailer.createTransport({
            service: "Sendgrid",
            auth: {
              user: process.env.SENDGRID_USERNAME,
              pass: process.env.SENDGRID_PASSWORD,
            },
          });

          // Construct the email
          var guestMail = {
            from: "no-reply@weeat.com",
            to: reservation.user.email,
            subject: `Reservation: ${reservation._id}`,
            text: `Hello, ${reservation.user.firstName}\n\nYour reservation request has been sent to the host ${reservation.host.firstName}.\nWe will inform you once the host has taken action to your request.\n\nRegards,\nWeEAT`,
          };

          var hostMail = {
            from: "no-reply@weeat.com",
            to: reservation.host.email,
            subject: `Reservation: ${reservation._id}`,
            text: `Hello, ${reservation.host.firstName}\n\n${reservation.user.firstName} has requested to join one your event.\nTo take action please go to "My Events" tab located in the top right dropdown of the WeEAT website.\n\nRegards,\nWeEAT`,
          };

          // Send the emails
          transporter.sendMail(guestMail, (err) => {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
          });

          transporter.sendMail(hostMail, (err) => {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
          });

          res.status(200).send();
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
      )
        .then((result) => res.send(result))
        .catch(next);
    }
  },
};

function canEventBeBooked(eventID) {
  return new Promise((resolve) => {
    Event.findById(eventID)
      .populate("reservation")
      .then((result) => {
        if (
          result.guestRequired <=
          filter(result.reservation, { status: "confirmed" }).length + 1
        ) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      });
  });
}
