const UserController = require('../controller/user_controller');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send("It works!");
    });

    app.post('/api/register', UserController.register);
    app.post('/api/authenticate', UserController.authenticate);
  };