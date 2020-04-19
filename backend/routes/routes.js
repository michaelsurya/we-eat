const EventController = require("../controller/event_controller");
const ImageController = require("../controller/image_controller");
const ReservationController = require("../controller/reservation_controller");
const UserController = require("../controller/user_controller");

const upload = require("../config/multer");
const passport = require("passport");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("It works!");
  });

  app.post("/api/events", upload.any(), EventController.newEvent);
  app.get("/api/events/:id", EventController.getOnePublic);

  app.get("/api/myevents/:id", EventController.getMyEvents);
  app.get("/api/myreservations/:id", ReservationController.getMyReservations)

  app.post("/api/reservations", ReservationController.newReservation);
  app.patch("/api/reservations", ReservationController.editReservation);

  app.get("/api/users/:id", UserController.getOnePublic);
  app.get("/api/users/private/:id", UserController.getOnePrivate);

  app.post("/api/users/register", UserController.register);
  app.post("/api/users/login", UserController.authenticate);
  app.post(
    "/api/users/send/verification/",
    UserController.sendEmailVerification
  );
  app.get("/api/verify/:token", UserController.verifyEmail);

  // app.post('/api/uploads/event/cover/:id', upload.single("imageData"), ImageController.uploadEventCoverPicture)
  app.post(
    "/api/uploads/profile/:id",
    upload.single("imageData"),
    ImageController.uploadProfile
  );

  app.patch("/api/users/:id", UserController.edit);
};
