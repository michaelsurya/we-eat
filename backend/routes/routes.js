const UserController = require('../controller/user_controller');
const ImageController = require('../controller/image_controller');

const upload = require("../config/multer");
const passport = require("passport");

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send("It works!");
    });

    app.get('/api/users/:id', UserController.getOnePublic);
    app.get('/api/users/private/:id', UserController.getOnePrivate)

    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.authenticate);
    app.post('/api/users/send/verification/', UserController.sendEmailVerification)
    app.get('/api/verify/:token', UserController.verifyEmail);

    app.post("/api/uploads/profile/:id", upload.single('imageData'), ImageController.uploadProfile)

    app.patch('/api/users/:id', UserController.edit)

    
  };