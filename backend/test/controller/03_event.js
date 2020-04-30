const app = require("../../app");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const Event = mongoose.model("event");

const moment = require("moment");

var chai = require("chai");
var expect = chai.expect;
chai.should();
var chaiHttp = require("chai-http");
var chaiLike = require("chai-like");

chai.use(chaiHttp);
chai.use(chaiLike);

describe("Event", () => {
  let userID;
  let eventID;

  //Seed
  before(async () => {
    let res1 = await new User({
      email: "host@email.com",
      password: "12345678",
      repeatPassword: "12345678",
      firstName: "Host",
      surname: "Test",
      sex: "M",
      verifiedEmail: true,
    }).save();

    userID = res1._id;

    let res2 = await new Event({
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
      guestRequired: 2,
      price: 12,
      description: "description 1",
      cuisine: ["American", "British"],
      menu: [{ name: "m1", description: "m1" }],
      host: userID,
    }).save();
    eventID = res2._id;
  });

  describe("Positive: POST /api/events", () => {
    it("Should be able to create new event", (done) => {
      chai
        .request(app)
        .post("/api/events")
        .field("title", "title test")
        .field(
          "location",
          JSON.stringify({
            address: "70-78 Saint James' Boulevard",
            city: "Newcastle upon Tyne",
            state: "Tyne and Wear",
            postcode: "NE1 4BN",
            coords: { lat: 54.9680736526054, lng: -1.623775529113769 },
            country: "United Kingdom",
          })
        )
        .field("date", "02/05/2020 13:35")
        .field("time", 48900)
        .field("guestRequired", 12)
        .field("price", 15)
        .field("description", "This is description")
        .field("cuisine", JSON.stringify(["Greek"]))
        .field("allergen", JSON.stringify(["Milk"]))
        .field("menu", JSON.stringify([{ name: "m1", description: "m1" }]))
        .field("host", userID.toString())
        .attach("pictures", "../backend/test/images/1.jpg", "1.jpg")
        .end((err, res) => {
          expect(res).to.have.status(200);
          Event.findById(res.body._id).then((event) => {
            event.should.like({
              title: "title test",
              price: 15,
              guestRequired: 12,
            });
            done();
          });
        });
    });
  });

  describe("Negative: POST /api/events", () => {
    it("Event creation should fail when data is not complete", (done) => {
      chai
        .request(app)
        .post("/api/events")
        .field("title", "title test")
        .field(
          "location",
          JSON.stringify({
            address: "70-78 Saint James' Boulevard",
            city: "Newcastle upon Tyne",
            state: "Tyne and Wear",
            postcode: "NE1 4BN",
            coords: { lat: 54.9680736526054, lng: -1.623775529113769 },
            country: "United Kingdom",
          })
        )
        .field("guestRequired", 12)
        .field("price", 15)
        .field("description", "This is description")
        .field("cuisine", JSON.stringify(["Greek"]))
        .field("allergen", JSON.stringify(["Milk"]))
        .field("menu", JSON.stringify([{ name: "m1", description: "m1" }]))
        .field("host", userID.toString())
        .attach("pictures", "../backend/test/images/1.jpg", "1.jpg")
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("Positive: GET /api/myEvents", () => {
    it("Should return all the events that a user has", (done) => {
      chai
        .request(app)
        .get(`/api/myEvents/${userID}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });

  describe("Positive: GET /api/events/:id", () => {
    it("Should return all the neccesary data for an event", (done) => {
      chai
        .request(app)
        .get(`/api/events/${eventID}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.like({
            title: "title 1",
            price: 12,
            guestRequired: 2,
          });
          done();
        });
    });
  });
});
