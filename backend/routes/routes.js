const express = require("express");
const path = require("path");

const EventController = require("../controller/event_controller");
const ImageController = require("../controller/image_controller");
const ReservationController = require("../controller/reservation_controller");
const UserController = require("../controller/user_controller");

const upload = require("../config/multer");

var router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

router.post("/api/events", upload.any(), EventController.newEvent);
router.get("/api/events/", EventController.search);
router.get("/api/events/:id", EventController.getOnePublic);

router.get("/api/myevents/:id", EventController.getMyEvents);
router.get("/api/myreservations/:id", ReservationController.getMyReservations);

router.post("/api/reservations", ReservationController.newReservation);
router.patch("/api/reservations", ReservationController.editReservation);

router.get("/api/users/:id", UserController.getOnePublic);
router.patch("/api/users/:id", UserController.edit);
router.get("/api/users/private/:id", UserController.getOnePrivate);
router.post("/api/users/register", UserController.register);
router.post("/api/users/review", UserController.writeReview);
router.post("/api/users/login", UserController.authenticate);
router.post(
  "/api/users/send/verification/",
  UserController.sendEmailVerification
);
router.post(
  "/api/users/resend/verification/",
  UserController.resendEmailVerification
);
router.get("/api/verify/:token", UserController.verifyEmail);

router.post(
  "/api/uploads/profile/:id",
  upload.single("imageData"),
  ImageController.uploadProfile
);

router.get('*', (req,res) =>{
  res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

module.exports = router
