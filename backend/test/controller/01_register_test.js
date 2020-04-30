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

describe("Register", () => {
  describe("Positive: /api/users/register", () => {
    it("Should create a new user", (done) => {
      chai
        .request(app)
        .post("/api/users/register")
        .send({
          email: "register@email.com",
          password: "12345678",
          repeatPassword: "12345678",
          firstName: "User",
          surname: "Test",
          sex: "M",
        })
        .end((err, res) => {
          User.findOne({ email: "register@email.com" }).then((user) => {
            user.should.like({
              firstName: "User",
              surname: "Test",
              sex: "M",
            });
            done();
          });
        });
    });
  });

  describe("Negative: /api/users/register", () => {
    //Seed
    before((done) => {
      new User({
        email: "register2@email.com",
        password: "12345678",
        repeatPassword: "12345678",
        firstName: "User",
        surname: "Test",
        sex: "M",
      })
        .save()
        .then(() => done());
    });

    it("Should return an error when information provided is not complete", (done) => {
      chai
        .request(app)
        .post("/api/users/register")
        .send({
          email: "whatever@email.com",
          password: "12345678",
          repeatPassword: "12345678",
          firstName: "User",
          surname: "Test",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("Should return an error when email is already registered", (done) => {
      chai
        .request(app)
        .post("/api/users/register")
        .send({
          email: "register2@email.com",
          password: "12345678",
          repeatPassword: "12345678",
          firstName: "User",
          surname: "Test",
          sex: "M",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
