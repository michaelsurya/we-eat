const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

let transporter = nodemailer.createTransport(mg(auth));

module.exports = transporter;
