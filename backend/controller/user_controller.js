const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Joi = require("@hapi/joi");

const secret = process.env.secret;

module.exports = {
  /*
   * Function  for new user registration
   */
  register(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      repeatPassword: Joi.ref("password"),
      firstName: Joi.string().required(),
      surname: Joi.string().required()
    });

    const { error, value } = schema.validate(req.body);

    // Check validation, input sanitation
    if (error) {
      res.status(400).json(error.details);
    } else {
      // Check if email is available
      User.findOne({ email: value.email }).then(user => {
        if (user) {
          return res.status(400).json({ message: "Email already exists" });
        }
      });

      // Save user
      const user = new User(value);
      user
        .save()
        .then(result => {
          if (result) {
            res.status(200).send();
          }
        })
        .catch(next);
    }
  },

  /*
   * Function to authenticate user login
   */
  authenticate(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }

    const { email, password } = value;

    User.findOne({ email })
      .then(user => {
        // Check if user exists
        if (!user) {
          return res.status(404).json({ message: "Invalid email or password" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              firstName: user.firstName,
              surname: user.surname
            };
            // Sign token
            jwt.sign(
              payload,
              process.env.secret,
              {
                expiresIn: 31556926 // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ message: "Invalid email or password" });
          }
        });
      })
      .catch(next);
  }
};
