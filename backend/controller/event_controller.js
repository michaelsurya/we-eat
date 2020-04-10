const Event = require("../models/event");

const Joi = require("@hapi/joi");

module.exports = {
  newEvent(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      title: Joi.string().required(),
      location: Joi.string().required(),
      date: Joi.date().required(),
      duration: Joi.string().required(),
      guestRequired: Joi.number().required(),
      description: Joi.string().required(),
      cuisine: Joi.array().items(Joi.string()),
      allergen: Joi.array().items(Joi.string()),

      host: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    // Check validation, input sanitation
    if (error) {
      res.status(400).json(error.details);
    } else {
      const event = new Event(value);
      event
        .save()
        .then(() => res.status(200).send())
        .catch(next);
    }
  },
};
