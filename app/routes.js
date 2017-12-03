var usersModel = require('./models/user');

function doesUserExist(username, res) {

    usersModel.findOne({ 'username': username }, function (err, user) {
        if (err) {
            return handleError(err);
        }

        res.json(user);
        console.log('found user ' + username + 'with password ' + user.password);
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    app.get('/api/user', function (req, res) {
        // use mongoose to get all todos in the database
        doesUserExist(res);
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

    //// delete a todo
    //app.delete('/api/todos/:todo_id', function (req, res) {
    //    Todo.remove({
    //        _id: req.params.todo_id
    //    }, function (err, todo) {
    //        if (err)
    //            res.send(err);
//
    //        getTodos(res);
    //    });
    //});

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};