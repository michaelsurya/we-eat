const Event = require("../models/event");

const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
Joi.objectId = require("joi-objectid")(Joi);

const moment = require("moment");

module.exports = {
  newEvent(req, res, next) {
    //Parse
    if (req.body.allergen) req.body.allergen = JSON.parse(req.body.allergen);
    if (req.body.cuisine) req.body.cuisine = JSON.parse(req.body.cuisine);
    if (req.body.location) req.body.location = JSON.parse(req.body.location);
    if (req.body.menu) req.body.menu = JSON.parse(req.body.menu);

    console.log(req.body);

    // Validation Schema
    const schema = Joi.object({
      title: Joi.string().required(),
      location: Joi.any().required(),
      date: Joi.date().format("DD/MM/YYYY HH:mm").required(),
      time: Joi.number().required(),
      duration: Joi.string().required(),
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
        return { imageName: file.filename, imageData: file.path };
      });
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
    console.log(req.query);
    Event.find(buildQuery(req.query))
      .populate("host")
      .sort({date: 1, time: 1, price: 1})
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

  console.log(query);

  return query;
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
