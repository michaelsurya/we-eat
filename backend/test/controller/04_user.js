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

describe("User", () => {
  let user1;
  let user2;
  let reservation;
  let reservation2;
  let reservation3;

  //Seed
  before(async () => {
    // First user
    await new User({
      email: "user5@email.com",
      password: "12345678",
      repeatPassword: "12345678",
      firstName: "User5",
      surname: "Test",
      sex: "M",
      verifiedEmail: true,
    })
      .save()
      .then((user) => {
        user1 = user._id;
      });

    // Second user
    await new User({
      email: "user6@email.com",
      password: "12345678",
      repeatPassword: "12345678",
      firstName: "User6",
      surname: "Test",
      sex: "M",
      verifiedEmail: true,
    })
      .save()
      .then((user) => {
        user2 = user._id;
      });

    // Reservation
    await new Reservation({
      host: user1,
      user: user2,
      status: "confirmed",
      reviewToken: {
        validStart: moment().startOf("day").toDate(),
        validEnd: moment().add(1, "days").endOf("day").toDate(),
      },
      event: user1, //Dumb reference wont be used
    })
      .save()
      .then((res) => {
        reservation = res._id;
      });

    // Reservation2
    await new Reservation({
      host: user1,
      user: user2,
      status: "confirmed",
      reviewToken: {
        validStart: moment().subtract(7, "days").startOf("day").toDate(),
        validEnd: moment().subtract(1, "days").endOf("day").toDate(),
      },
      event: user1, //Dumb reference wont be used
    })
      .save()
      .then((res) => {
        reservation2 = res._id;
      });

      // Reservation3
    await new Reservation({
      host: user1,
      user: user2,
      status: "pending",
      event: user1, //Dumb reference wont be used
    })
      .save()
      .then((res) => {
        reservation3 = res._id;
      });
  });

  describe("Positive PATCH /api/users/:id", () => {
    it("Should edit the user's details", (done) => {
      chai
        .request(app)
        .patch(`/api/users/${user1}`)
        .send({
          firstName: "New Firstname",
          surname: "New Surname",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          User.findById(user1).then((user) => {
            user.should.like({
              firstName: "New Firstname",
              surname: "New Surname",
            });
            done();
          });
        });
    });
  });

  describe("Negative PATCH /api/users/:id", () => {
    it("Should not be able to edit email", (done) => {
      chai
        .request(app)
        .patch(`/api/users/${user1}`)
        .send({
          email: "newemail@email.com",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it("Should not be able to edit sex", (done) => {
      chai
        .request(app)
        .patch(`/api/users/${user1}`)
        .send({
          sex: "F",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("Positive POST /api/users/review", () => {
    it("Costumer should be able to write a review", (done) => {
      chai
        .request(app)
        .post(`/api/users/review`)
        .send({
          target: user1,
          user: user2,
          reservation: reservation,
          review: "This is review by costumer",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          User.findById(user1).then((user) => {
            expect(user.reviews.length).to.equals(1);
            done();
          });
        });
    });
    it("Host should be able to write a review", (done) => {
      chai
        .request(app)
        .post(`/api/users/review`)
        .send({
          target: user2,
          user: user1,
          reservation: reservation,
          review: "This is review by Host",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          User.findById(user1).then((user) => {
            expect(user.reviews.length).to.equals(1);
            done();
          });
        });
    });
  });

  describe("Negative POST /api/users/review", () => {
    it("Should not be able to write review if date range is invalid", (done) => {
      chai
        .request(app)
        .post(`/api/users/review`)
        .send({
          target: user1,
          user: user2,
          reservation: reservation2,
          review: "This is review by costumer",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done()
        });
    });
    it("Should not be able to write review if review token does not exist", (done) => {
      chai
        .request(app)
        .post(`/api/users/review`)
        .send({
          target: user1,
          user: user2,
          reservation: reservation3,
          review: "This is review by costumer",
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done()
        });
    });
  });
});
