const app = require("../../app");
const mongoose = require("mongoose");
const User = mongoose.model("user");

var chai = require("chai");
var expect = chai.expect;
chai.should();
var chaiHttp = require("chai-http");
var chaiLike = require("chai-like");

chai.use(chaiHttp);
chai.use(chaiLike);

describe("Login", () => {
  describe("Positive: /api/users/login", () => {
    //Seed
    before((done) => {
      new User({
        email: "user@email.com",
        password: "12345678",
        repeatPassword: "12345678",
        firstName: "User",
        surname: "Test",
        sex: "M",
        verifiedEmail: true,
      })
        .save()
        .then(() => done());
    });

    it("Should be able to login with correct credential", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({
          email: "user@email.com",
          password: "12345678",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("Negative: /api/users/login", () => {
    //Seed
    before((done) => {
      new User({
        email: "user2@email.com",
        password: "12345678",
        repeatPassword: "12345678",
        firstName: "User",
        surname: "Test",
        sex: "M",
      })
        .save()
        .then(() => done());
    });

    it("Should not be able to login with unregistered email", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({
          // Unregistered email
          email: "whatever@email.com",
          password: "12345678",
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it("Should not be able to login with wrong password", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({
          // Wrong password
          email: "user@email.com",
          password: "00000000",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("Should not be able to login when user has not verify the email", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({
          // Correct credential but email has not been verified
          email: "user2@email.com",
          password: "12345678",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
