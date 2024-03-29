const Event = require("../models/event");
const User = require("../models/user");

const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
Joi.objectId = require("joi-objectid")(Joi);

const filter = require("lodash/filter");

const moment = require("moment");

module.exports = {
  newEvent(req, res, next) {
    //Parse
    if (req.body.allergen) req.body.allergen = JSON.parse(req.body.allergen);
    if (req.body.cuisine) req.body.cuisine = JSON.parse(req.body.cuisine);
    if (req.body.location) req.body.location = JSON.parse(req.body.location);
    if (req.body.menu) req.body.menu = JSON.parse(req.body.menu);

    // Validation Schema
    const schema = Joi.object({
      title: Joi.string().required(),
      location: Joi.any().required(),
      date: Joi.date().format("DD/MM/YYYY HH:mm").utc().required(),
      time: Joi.number().required(),
      duration: Joi.string(),
      guestRequired: Joi.number().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      cuisine: Joi.array().items(Joi.any()).required(),
      allergen: Joi.array().items(Joi.any()),
      menu: Joi.array().items(Joi.any()).required(),

      pictures: Joi.array(),

      host: Joi.objectId().required(),
    });

    const { error, value } = schema.validate(req.body);
    // Check validation, input sanitation
    if (error) {
      res.status(400).json(error.details);
    } else {
      // Construct the pictures
      value.pictures = req.files.map((file) => {
        return { imageName: file.filename, imageData: file.path.replace("\\","/") };
      });
      // Set date to be timezone agnostic
      value.date = moment.utc(value.date, "DD/MM/YYYY HH:mm");
      value.address = value.location.address;
      value.city = value.location.city;
      value.state = value.location.state;
      value.postcode = value.location.postcode;
      value.country = value.location.country;
      value.location = {
        type: "Point",
        coordinates: [value.location.coords.lng, value.location.coords.lat],
      };

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
    } else {
      Event.findById(value.id)
        .populate({
          path: "host",
          populate: {
            path: "reviews.user",
          },
        })
        .populate({
          path: "reservation",
        })
        .then((event) => {
          //If user is not found
          if (!event) {
            return res.status(404).json({ error: "Event not found" });
          } else {
            return res.send(event);
          }
        })
        .catch(next);
    }
  },

  /*
   * Function to get all events belonging to a host
   * @path /myevents/:id
   */
  getMyEvents(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      return res.status(400).json(error.details);
    } else {
      Event.find({ host: value.id })
        .sort({ date: 1 })
        .populate({
          path: "reservation",
          populate: {
            path: "user",
          },
        })

        .then((result) => res.send(result))
        .catch(next);
    }
  },

  /*
   * Function to search for events
   * @path /myevents/:id
   */
  search(req, res, next) {
    let operation = Event.find(buildQuery(req.query))
      .populate({
        path: "host",
      })
      .sort({ date: 1, time: 1, price: 1 });

    if (req.query.limit) {
      operation = operation.limit(parseInt(req.query.limit));
    }

    operation
      .then((result) => {
        if (req.query.language) {
          return filter(result, (event) =>
            event.host.languages.some((language) =>
              req.query.language.includes(language)
            )
          );
        } else {
          return result;
        }
      })
      .then((result) => res.send(result))
      .catch(next);
  },
};

const buildQuery = (criteria) => {
  const query = {};

  // When max guest is specified
  if (criteria.guestRequired) {
    query.guestRequired = {
      $lte: criteria.guestRequired,
    };
  }

  // Exclude event with specified allergens
  if (criteria.allergen) {
    query.allergen = {
      $nin: criteria.allergen,
    };
  }

  // Event must have the specified cuisine
  if (criteria.cuisine) {
    query.cuisine = {
      $in: criteria.cuisine,
    };
  }

  // Price range
  if (criteria.price) {
    query.price = {
      $gte: criteria.price[0],
      $lte: criteria.price[1],
    };
  }

  // Date
  if (criteria.date) {
    // The user specified a time frame
    if (criteria.time) {
      let start = `${criteria.date} ${criteria.time[0]}`;
      let end = `${criteria.date} ${criteria.time[1]}`;
      query.date = {
        $gte: moment.utc(start, "DD/MM/YYYY HH:mm").toDate(),
        $lte: moment.utc(end, "DD/MM/YYYY HH:mm").toDate(),
      };
    }
    //No specified time frame
    else {
      query.date = {
        $gte: moment.utc(criteria.date, "DD/MM/YYYY").startOf("day").toDate(),
        $lte: moment.utc(criteria.date, "DD/MM/YYYY").endOf("day").toDate(),
      };
    }
  }
  // No specified date
  else {
    // No specified date but specified time frame
    if (criteria.time) {
      let sotd = moment().startOf("day");
      let start = moment(criteria.time[0], "HH:mm").diff(sotd, "seconds");
      let end = moment(criteria.time[1], "HH:mm").diff(sotd, "seconds");
      query.time = {
        $gte: start,
        $lt: end,
      };
    }
    // Default
    else {
      query.date = {
        $gte: moment.utc().startOf("day").toDate(),
      };
    }
  }

  if (criteria.location) {
    query.location = {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [criteria.location[1], criteria.location[0]],
        },
        $maxDistance: 20000, //20km
      },
    };
  }

  return query;
};
