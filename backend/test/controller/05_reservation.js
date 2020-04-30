const app = require("../../app");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const Event = mongoose.model("event");
const Reservation = mongoose.model("reservation");

const moment = require("moment");

var chai = require("chai");
var expect = chai.expect;
chai.should();
var chaiHttp = require("chai-http");
var chaiLike = require("chai-like");

chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(require("chai-things"));

describe("Reservation", () => {
  let user1;
  let user2;
  let user3;
  let eventID;

  //Seed
  before(async () => {
    // First user
    await new User({
      email: "reservation1@email.com",
      password: "12345678",
      repeatPassword: "12345678",
      firstName: "Reservation1",
      surname: "Test",
      sex: "M",
      verifiedEmail: true,
    })
      .save()
      .then((res) => {
        user1 = res._id;
      });

    //Second user
    await new User({
      email: "reservation2@email.com",
      password: "12345678",
      repeatPassword: "12345678",
      firstName: "Reservation2",
      surname: "Test",
      sex: "M",
      verifiedEmail: true,
    })
      .save()
      .then((res) => {
        user2 = res._id;
      });

    //Third user
    await new User({
      email: "reservation3@email.com",
      password: "12345678",
      repeatPassword: "12345678",
      firstName: "Reservation3",
      surname: "Test",
      sex: "M",
      verifiedEmail: true,
    })
      .save()
      .then((res) => {
        user3 = res._id;
      });

    //Event belonging to user 1
    await new Event({
      title: "title 1",
      location: {
        type: "Point",
        coordinates: [-1.623775529113769, 54.9680736526054],
      },
      address: "address 1",
      city: "Newcastle upon Tyne",
      state: "Type and Wear",
      country: "United Kingdom",
      postcode: "NE1 4BN",
      date: moment.utc("25/05/2020 18:00", "DD/MM/YYYY HH:mm"),
      time: 64800,
      guestRequired: 1,
      price: 12,
      description: "description 1",
      cuisine: ["American", "British"],
      menu: [{ name: "m1", description: "m1" }],
      host: user1,
    })
      .save()
      .then((event) => (eventID = event._id));
  });

  describe("Positive: POST /api/reservations", () => {
    let rsvt;
    it("Should be able a new reservation", (done) => {
      chai
        .request(app)
        .post(`/api/reservations/`)
        .send({
          event: eventID,
          host: user1,
          user: user2,
        })
        .end((err, res) => {
          Reservation.findById(res.body.id).then((reservation) => {
            rsvt = reservation._id;
            expect(reservation.event).to.eql(eventID);
            expect(reservation.host).to.eql(user1);
            expect(reservation.user).to.eql(user2);
            expect(reservation.status).to.equal("pending");
            done();
          });
        });
    });
    it("Newly made reservation should be stored in the event model", (done) => {
      Event.findById(eventID).then((event) => {
        expect(event.reservation).to.include(rsvt);
        done();
      });
    });
  });

  describe("Positive: PATCH /api/reservations", () => {
    let rsvt;
    it("Should be able to confirm a reservation", (done) => {
      chai
        .request(app)
        .patch(`/api/reservations/`)
        .send({
          event: eventID,
          host: user1,
          user: user2,
          status: "confirmed",
        })
        .end((err, res) => {
          rsvt = res.body.id;
          Reservation.findById(rsvt).then((reservation) => {
            expect(reservation.event).to.eql(eventID);
            expect(reservation.host).to.eql(user1);
            expect(reservation.user).to.eql(user2);
            expect(reservation.status).to.eql("confirmed");
            done();
          });
        });
    });
    it("Confirmed reservation should automatically provie a review token", (done) => {
      Reservation.findById(rsvt).then((reservation) => {
        expect(reservation).to.have.property("reviewToken");
        done();
      });
    });
  });

  describe("Negative: POST /api/reservations", () => {
    it("Should not be able to make a reservation when event is already full", (done) => {
      chai
        .request(app)
        .post(`/api/reservations/`)
        .send({
          event: eventID,
          host: user1,
          user: user3,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
