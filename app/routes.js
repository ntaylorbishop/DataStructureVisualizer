var usersModel = require('./models/User.js');
var bstModel = require('./models/BinarySearchTree.js');

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
                res.send({ 'doesExist' : true, 'outputMsg' : outputMsgs.UNEXPECTED_ERR });
            }
    
            if(user.length > 0) {
                if(user[0].password == req.body.password) {
                    res.send({ 'doesExist' : true, 'outputMsg' : outputMsgs.LOGIN_SUCCESSFUL });                    
                }
                else {
                    res.send({ 'doesExist' : false, 'outputMsg' : outputMsgs.USERNAME_PW_MISMATCH });                                        
                }
            }
            else {                
                res.send({ 'doesExist' : false, 'outputMsg' : outputMsgs.USER_DOESNT_EXIST });
            }
        });    
    });

    //Register user
    app.post('/api/user/register', function (req, res) {

        usersModel.find({ 'username': req.body.username }, function (err, users) {

            if (err) {
                console.log(err);
                res.send({ 'accountCreated' : false, 'outputMsg' : outputMsgs.UNEXPECTED_ERR });
            }
            else if(users.length > 0) {
                res.send({ 'accountCreated' : false, 'outputMsg' : outputMsgs.USER_ALREADY_EXISTS });                
            }
            else {
                usersModel.create({
                    username: req.body.username,
                    password: req.body.password,
                    done: false
                }, function (err, user) {
                    if (err) {
                        console.log(err);
                        res.send({ 'accountCreated' : false, 'outputMsg' : outputMsgs.UNEXPECTED_ERR });
                    }
                    else {
                        res.send({ 'accountCreated' : true, 'outputMsg' : outputMsgs.REGISTRATION_SUCCESSFUL });
                    }
                });
            }
        });   
    });

    app.post('/api/structure/create-bst', function(req, res) {

        bstModel.create({
            owner: req.body.owner,
            title: req.body.title,
            values: req.body.values
        }, function (err, allBSTs) {
            if (err) {
                console.log(err);
                res.send({ 'successful' : false, 'allBSTs' :  [] });
                return;
            }
            
            bstModel.find({ 'owner': req.body.owner }, function (err, allBSTs) {
                
                if (err) {
                    console.log(err);
                    res.send({ 'successful' : false, 'allBSTs' :  [] });
                }
                else {
                    console.log(allBSTs);
                    res.send({ 'successful' : true, 'allBSTs' : allBSTs });                
                }
            });  
        });
    });

    app.get('/api/structure/load-default-bsts', function(req, res) {

        bstModel.find({ 'owner': 'default' }, function(err, allBSTs) {
            if (err) {
                res.send(err)
            }

            res.json(allBSTs);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};