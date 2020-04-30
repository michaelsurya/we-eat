const mongoose = require("mongoose");

before((done) => {
  mongoose.connect("mongodb://localhost/weeat_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once("open", () => done())
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});

// Drop everything after test
after((done) => {
  mongoose.connection.db.dropDatabase(() => done());
});
