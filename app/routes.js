var usersModel = require('./models/user');

var outputMsgs = {
    UNEXPECTED_ERR : 'An unexpected error occurred. Please try again later',
    LOGIN_SUCCESSFUL : 'Login successful',
    USERNAME_PW_MISMATCH : 'Username and password do no match',
    USER_ALREADY_EXISTS : 'That username is taken',
    REGISTRATION_SUCCESSFUL : 'Registration was successful',
    USER_DOESNT_EXIST : 'That username does not exist'
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    app.post('/api/user/login', function (req, res) {
        
        usersModel.find({ 'username': req.body.username }, function (err, user) {

            if (err) {
                console.log(err);
                res.send({ 'doesExist' : 'true', 'outputMsg' : outputMsgs.UNEXPECTED_ERR });
            }
    
            if(user.length > 0) {
                if(user[0].password == req.body.password) {
                    res.send({ 'doesExist' : 'true', 'outputMsg' : outputMsgs.LOGIN_SUCCESSFUL });                    
                }
                else {
                    res.send({ 'doesExist' : 'false', 'outputMsg' : outputMsgs.USERNAME_PW_MISMATCH });                                        
                }
            }
            else {                
                res.send({ 'doesExist' : 'false', 'outputMsg' : outputMsgs.USER_DOESNT_EXIST });
            }
        });    
    });

    // create todo and send back all todos after creation
    app.post('/api/user/register', function (req, res) {

        usersModel.find({ 'username': req.body.username }, function (err, users) {

            if (err) {
                console.log(err);
                res.send({ 'accountCreated' : 'false', 'outputMsg' : outputMsgs.UNEXPECTED_ERR });
            }
            else if(users.length > 0) {
                res.send({ 'accountCreated' : 'false', 'outputMsg' : outputMsgs.USER_ALREADY_EXISTS });                
            }
            else {
                usersModel.create({
                    username: req.body.username,
                    password: req.body.password,
                    done: false
                }, function (err, user) {
                    if (err) {
                        console.log(err);
                        res.send({ 'accountCreated' : 'false', 'outputMsg' : outputMsgs.UNEXPECTED_ERR });
                    }
                    else {
                        res.send({ 'accountCreated' : 'true', 'outputMsg' : outputMsgs.REGISTRATION_SUCCESSFUL });
                    }
                });
            }
        });   
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};