const User = require("../models/user");

module.exports = {
  uploadProfile(req, res, next) {
    // const newImage = new Image({
    //   imageName: req.body.imageName,
    //   imageData: req.file.path,
    // });

    // newImage
    //   .save()
    //   .then((result) => {
    //     res.status(200).json({
    //       sucess: true,
    //       document: result,
    //     });
    //   }) 
    //   .catch(next);

    const newImage = {
      imageName: req.body.imageName,
      imageData: req.file.path,
    };

    User.findByIdAndUpdate(req.params.id, {
      profilePict: newImage,
    })
      .then((result) => res.send(result))
      .catch(next);
  },
};
