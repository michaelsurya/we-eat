const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const app = express();

mongoose.Promise = global.Promise;
// if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/weeat", { useNewUrlParser: true, useUnifiedTopology:true }) ;
  mongoose.connection
    .once("open", () => {
      console.log("Connection succesful");
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
// }

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
