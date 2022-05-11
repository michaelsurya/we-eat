const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const routes = require("./routes/routes");

const app = express();

const dbUri = process.env.DB_URI || "mongodb://localhost/weeat";

mongoose.Promise = global.Promise;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", () => {
    console.log("Connection succesful");
  })
  .on("error", (error) => {
    console.warn("Warning", error);
  });

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "img-src * blob: data: ;"
  );
  next();
});

app.use("/uploads", express.static("uploads"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

const baseUri = `${process.env.baseUri}` || "/";

// React
app.use(baseUri, express.static(path.resolve(__dirname, "../client/build/")));

// Routes
app.use(baseUri, routes);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
