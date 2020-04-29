const Event = require("../models/event");
const Reservation = require("../models/reservation");

const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
Joi.objectId = require("joi-objectid")(Joi);

const filter = require("lodash/filter");

const moment = require("moment");
const nodemailer = require("nodemailer");

module.exports = {
  async editReservation(req, res, next) {
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
      let updatedField = {};
      //Set the reservation status accordingly
      updatedField.status = value.status;

      //If reservation is accepted then make the review token
      if(value.status === "confirmed"){
        const event = await Event.findById(value.event);
        updatedField.reviewToken = {
          validStart: moment.utc(event.date).add(1, "days").startOf("day"),
          validEnd: moment.utc(event.date).add(4, "days").startOf("day"),
        };
        updatedField.approvedDate = moment.utc();
      }
      
      Reservation.findOneAndUpdate(
        { event: value.event, host: value.host, user: value.user },
        updatedField
      )
        .then((result) =>
          Reservation.findById(result._id).populate("user").populate("host")
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
          let guestMail = {
            from: "no-reply@weeat.com",
            to: reservation.user.email,
            subject: `Reservation: ${reservation._id}`,
          };

          if ((reservation.status = "rejected")) {
            guestMail.text = `Hello, ${reservation.user.firstName}\n\nUnfortunately, your reservation request has been rejected by the host.\n\nRegards,\nWeEAT`;
          }
          if ((reservation.status = "confirmed")) {
            guestMail.text = `Hello, ${reservation.user.firstName}\n\\nCongratulation, your reservation request has been confirmed by the host.\nYou can check the host information in "My Reservations" page.\n\nRegards,\nWeEAT`;
          }

          // Send the emails
          transporter.sendMail(guestMail, (err) => {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
          });

          return res.status(200).send();
        })
        .catch(next);
    }
  },

  getMyReservations(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      return res.status(400).json(error.details);
    } else {
      Reservation.find({ user: value.id })
        .populate({
          path: "event",
        })
        .sort({ reservationDate: 1 })
        .then((data) =>
          Promise.all(
            data.map((d) =>
              d.status === "confirmed"
                ? Reservation.populate(d, {
                    path: "host",
                    select: "firstName surname phoneNumber email",
                  })
                : Reservation.populate(d, {
                    path: "host",
                    select: "firstName surname",
                  })
            )
          )
        )
        .then((result) => res.send(result))
        .catch(next);
    }
  },

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
      if (!(await canEventBeBooked(value.event))) {
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

          return res.status(200).send();
        })
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
          result.guestRequired >=
          filter(result.reservation, { status: "confirmed" }).length + 1
        ) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      });
  });
}
