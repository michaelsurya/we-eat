const Event = require("../models/event");

const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const mongoose = require("mongoose");

module.exports = {
  async newEvent(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      title: Joi.string().required(),
      location: Joi.string().required(),
      date: Joi.date().format("DD/MM/YYYY HH:mm").required(),
      duration: Joi.string().required(),
      guestRequired: Joi.number().required(),
      description: Joi.string().required(),
      cuisine: Joi.array().items(Joi.string()),
      allergen: Joi.array().items(Joi.string()),

      pictures: Joi.array(),

      host: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    // Check validation, input sanitation
    if (error) {
      res.status(400).json(error.details);
    } else {
      // sonstruct the pictures
      value.pictures = req.files.map((file) => {
        return { imageName: file.filename, imageData: file.path };
      });

      const newEvent = new Event(value);
      newEvent.save().then((result) => res.status(200).send(result));
      res.status(200).send();
    }
  },
};

// const session  = await mongoose.startSession();

//       session.startTransaction();
//       try {
//         const event = new Event(value);
//         await event.save();

//         // commit the changes if everything was successful
//         await session.commitTransaction();
//         // send success response
//         res.status(200).send();
//       }
//       catch(next) {
//         console.log("Error")
//         await session.abortTransaction();
//       }
//       finally{
//         session.endSession();
//       }
