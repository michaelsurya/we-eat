const UserController = require('../controller/user_controller');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send("It works!");
    });

    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.authenticate);

    app.get('/api/users/:id', UserController.getOne)
  };