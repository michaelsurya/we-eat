const UserController = require('../controller/user_controller');

const passport = require("passport");

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send("It works!");
    });

    app.get('/api/users/:id', UserController.getOnePublic);
    app.get('/api/users/private/:id', UserController.getOnePrivate)

    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.authenticate);

    app.patch('/api/users/:id', UserController.edit)

    
  };