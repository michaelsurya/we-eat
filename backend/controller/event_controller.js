const Event = require("../models/event");

const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const mongoose = require("mongoose");

module.exports = {
  async newEvent(req, res, next) {
    //Parse
    if (req.body.menu) req.body.menu = JSON.parse(req.body.menu);
    if (req.body.cuisine) req.body.cuisine = JSON.parse(req.body.cuisine);
    if (req.body.allergen) req.body.allergen = JSON.parse(req.body.allergen);

    // Validation Schema
    const schema = Joi.object({
      title: Joi.string().required(),
      location: Joi.string().required(),
      date: Joi.date().format("DD/MM/YYYY HH:mm").required(),
      duration: Joi.string().required(),
      guestRequired: Joi.number().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      cuisine: Joi.array().items(Joi.any()).required(),
      allergen: Joi.array().items(Joi.any()),
      menu: Joi.array().items(Joi.any()).required(),

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
      newEvent
        .save()
        .then((result) => res.status(200).send(result))
        .catch(next);
    }
  },

  /*
   * Function to get event details
   * @path /users/:id
   */
  getOnePublic(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      return res.status(400).json(error.details);
    }

    Event.findById(value.id)
      .populate("host")
      .then((event) => {
        //If user is not found
        if (!event) {
          return res.status(404).json({ error: "Event not found" });
        } else {
          return res.send(event);
        }
      })
      .catch(next);
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
