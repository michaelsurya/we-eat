const User = require("../models/user");
const Event = require("../models/event");

module.exports = {
  uploadProfile(req, res, next) {
    const newImage = {
      imageName: req.body.imageName,
      imageData: req.file.path,
    };

    User.findByIdAndUpdate(req.params.id, {
      profilePict: newImage,
    })
      .then(() => User.findById(req.params.id))
      .then((user) => res.status(200).send(user.profilePict))
      .catch(next);
  },

  uploadEventCoverPicture(req, res, next) {
    const newImage = {
      imageName: req.body.imageName,
      imageData: req.file.path,
    };

    Event.findByIdAndUpdate(req.params.id, { coverPict: newImage })
      .then(() => res.status(200).send())
      .catch(next);
  },
};
