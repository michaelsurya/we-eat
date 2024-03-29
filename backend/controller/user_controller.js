const User = require("../models/user");
const Token = require("../models/token");
const Reservation = require("../models/reservation");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const moment = require("moment");
const transporter = require("../config/nodemailer");

module.exports = {
  /*
   * Function to authenticate user login
   * @path /users/authenticate
   */
  authenticate(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    // Convert email to lower case
    value.email = value.email.toLowerCase();

    if (error) {
      return res.status(400).json(error.details);
    }

    const { email, password } = value;

    User.findOne({ email })
      .select("+password")
      .then((user) => {
        // Check if user exists
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        if (!user.verifiedEmail) {
          return res
            .status(400)
            .json({ error: "Please verify your email address" });
        }
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              firstName: user.firstName,
              surname: user.surname,
            };
            // Sign token
            jwt.sign(
              payload,
              process.env.secret,
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          } else {
            return res.status(400).json({ error: "Invalid email or password" });
          }
        });
      })
      .catch(next);
  },

  /*
   * Function to edit user details
   * @path /users/edit/
   * @private
   */
  edit(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      firstName: Joi.string(),
      surname: Joi.string(),
      description: Joi.string(),
      phoneNumber: Joi.string().allow(""),
      languages: Joi.array(),
      interests: Joi.array(),
    });

    const { error, value } = schema.validate(req.body);

    const id = req.params.id;

    // Check validation, input sanitation
    if (error) {
      res.status(400).json(error.details);
    } else {
      // Find user by id and update the field
      User.findByIdAndUpdate({ _id: id }, value)
        .then((result) => res.send(result))
        .catch(next);
    }
  },

  /*
   * Function to get user details
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

    User.findById(value.id)
      .populate({
        path: "reviews.user",
      })
      .then((user) => {
        //If user is not found
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        } else {
          return res.send(user);
        }
      })
      .catch(next);
  },

  /*
   * Function to get user details
   * @path /users/private/:id
   */
  getOnePrivate(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      return res.status(400).json(error.details);
    }

    User.findById(value.id)
      .select("+phoneNumber")
      .then((user) => {
        //If user is not found
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        } else {
          return res.send(user);
        }
      })
      .catch(next);
  },

  /*
   * Function  for new user registration
   * @path /users/register
   */
  register(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      repeatPassword: Joi.ref("password"),
      firstName: Joi.string().required(),
      surname: Joi.string().required(),
      sex: Joi.string().valid("M", "F").required(),
    });

    const { error, value } = schema.validate(req.body);

    // Convert email to lower case
    value.email = value.email.toLowerCase();

    // Check validation, input sanitation
    if (error) {
      res.status(400).json(error.details);
    } else {
      // Check if email is available
      User.findOne({ email: value.email })
        .then((user) => {
          if (user) {
            return res.status(400).json({ error: "Email already exists" });
          } else {
            // Save user
            const user = new User(value);
            user.save().then((result) => {
              if (result) {
                sendVerificationEmail(result._id, req, res, next);
              }
            });
          }
        })
        .catch(next);
    }
  },

  /*
   * Function to send email verification
   * @path /users/send/verification/
   */
  sendEmailVerification(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details);
    } else {
      sendVerificationEmail(userID, req, res, next);
    }
  },

  /*
   * Resend email verification by email
   * @path /users/resend/verification/
   */
  resendEmailVerification(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details);
    } else {
      User.findOne({ email: value.email }).then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ error: "This email is not associated with any user." });
        } else if (user.verifiedEmail) {
          return res
            .status(400)
            .json({ error: "This account is already verified." });
        }
        sendVerificationEmail(user._id, req, res, next);
      });
    }
  },

  /*
   * Function to verify user email
   * @path /verify/:token
   */
  verifyEmail(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      token: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      return res.status(400).json(error.details);
    } else {
      Token.findOne({ token: value.token })
        .then((token) => {
          if (!token) {
            res.status(404).json({ error: "Invalid/Expired token" });
          }

          User.findById(token.userId).then((user) => {
            if (!user) {
              res
                .status(404)
                .json({ error: "Unable to find user for this token." });
            }
            if (user.verifiedEmail) {
              res
                .status(400)
                .json({ error: "This user has verified the email." });
            }
            // Set user to verified and save
            user.verifiedEmail = true;
            user.save().then((result) => {
              if (result) {
                res.status(200).send("Email verification sucess.");
              }
            });
          });
        })
        .catch(next);
    }
  },

  async writeReview(req, res, next) {
    // Validation Schema
    const schema = Joi.object({
      user: Joi.objectId().required(),
      target: Joi.objectId().required(),
      reservation: Joi.objectId().required(),
      review: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json(error.details);
    } else {
      const reservation = await Reservation.findById(value.reservation);
      // Check if token exists
      if (reservation.reviewToken) {
        // Check if the time is valid
        if (
          !moment
            .utc()
            .isBetween(
              reservation.reviewToken.validStart,
              reservation.reviewToken.validEnd
            )
        ) {
          res
            .status(400)
            .json({ error: "Not alowed to write review. Invalid timer range" });
        }
      } else {
        res.status(404).json({ error: "Review token not found" });
      }

      //Create the review schema
      const review = {
        user: value.user,
        date: moment.utc(),
        content: value.review,
      };

      User.findByIdAndUpdate(
        { _id: value.target },
        { $push: { reviews: review } }
      )
        .then(() =>
          Reservation.findByIdAndUpdate(
            { _id: value.reservation },
            { $push: { reviewers: value.user } }
          )
        )
        .then(() => res.status(200).send())
        .catch(next);
    }
  },
};

function sendVerificationEmail(userID, req, res, next) {
  User.findById(userID)
    .then((user) => {
      if (user) {
        //Check if user exsists
        if (user.verifiedEmail) {
          // Has the user verify the email?
          return res.status(400).json({ message: "Email has been verified" });
        } else {
          // Generate the token
          let token = new Token({
            userId: userID,
            token: crypto.randomBytes(16).toString("hex"),
          });
          
          let baseUri = process.env.baseUri ? process.env.baseUri : ""

          // Save the token in the DB
          token.save().then(() => {
            // Construct the email
            var mailOptions = {
              from: "MSPutra <no-reply@msputra.web.id>",
              to: user.email,
              subject: "Account Verification Token",
              text:
                "Hello,\n\n" +
                "Please verify your account by clicking the link: \nhttp://" +
                req.headers.host +
                baseUri +
                "/api/verify/" +
                token.token +
                "\n",
            };

            // Send the email
            transporter.sendMail(mailOptions, function (err) {
              if (err) {
                console.log(err)
                return res.status(500).send({ message: err.message });
              }
              return res
                .status(200)
                .send(
                  "A verification email has been sent to " + user.email + "."
                );
            });
          });
        }
      } else {
        // User does not exist
        return res.status(404).json({ error: "User not found" });
      }
    })
    .catch(next);
}
