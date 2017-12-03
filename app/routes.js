var usersModel = require('./models/user');

function doesUserExist(username, res) {


};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    app.get('/api/user', function (req, res) {

        console.log('hello!');
        
        usersModel.find({ 'username': username }, function (err, users) {
    
            if (err) {
                res.send(err);
            }
    
            if(users.length > 0) {
                res.send({ 'doesExist' : 'true' });
            }
            else {
                res.send({ 'doesExist' : 'false' });
            }
        });    
    });

    // create todo and send back all todos after creation
    app.post('/api/user', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        usersModel.create({
            username: req.username,
            password: req.password,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);
        });

    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};