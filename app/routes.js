var usersModel = require('./models/User.js');
var bstModel = require('./models/StructureModel.js');
var session = require("client-sessions");

var outputMsgs = {
    UNEXPECTED_ERR : 'An unexpected error occurred. Please try again later',
    LOGIN_SUCCESSFUL : 'Login successful',
    USERNAME_PW_MISMATCH : 'Username and password do no match',
    USER_ALREADY_EXISTS : 'That username is taken',
    REGISTRATION_SUCCESSFUL : 'Registration was successful',
    USER_DOESNT_EXIST : 'That username does not exist'
}

module.exports = function (app) {

    app.get('/api/user/checkLogin', function(req, res) {
        if(req.userLoginInfo) {
            res.send({ 'loggedIn' : req.userLoginInfo.loggedIn, 'username' : req.userLoginInfo.user });
        }
        else {
            res.send({ 'loggedIn' : false, 'username' : '' });
        }
    });

    // api ---------------------------------------------------------------------
    app.post('/api/user/login', function (req, res) {
        usersModel.find({ 'username': req.body.username }, function (err, user) {
            if (err) {
                console.log(err);
                res.send({ 'doesExist' : true, 'outputMsg' : outputMsgs.UNEXPECTED_ERR });
            }
    
            if(user.length > 0) {
                if(user[0].password == req.body.password) {
                    req.userLoginInfo.user = req.body.username;
                    req.userLoginInfo.loggedIn = true;
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

    // api ---------------------------------------------------------------------
    app.post('/api/user/logout', function (req, res) {
        req.userLoginInfo.reset();
        res.send({ 'loggedIn' : false, 'username' : '' });
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
                        bstModel.find({ 'owner': 'default' }, function(err, defaultStructures) {
                            if (err) {
                                res.send(err);
                                return;
                            }
                            
                            for(var i = 0; i < defaultStructures.length; i++) {
                                bstModel.create({
                                    dataType:       defaultStructures[i].dataType,
                                    values:         defaultStructures[i].values,
                                    title:          defaultStructures[i].title,
                                    structureType:  defaultStructures[i].structureType,
                                    owner:          req.body.username,
                                }, function (err, allBSTs) {
                                    if (err) {
                                        res.send(err);
                                        return;
                                    }
                                });
                            }
                        });

                        req.userLoginInfo.user = req.body.username;
                        req.userLoginInfo.loggedIn = true;
                        res.send({ 'accountCreated' : true, 'outputMsg' : outputMsgs.REGISTRATION_SUCCESSFUL });
                    }
                });
            }
        });   
    });

    app.post('/api/structure/create-structure', function(req, res) {
        bstModel.create({
            dataType: req.body.dataType,
            values: req.body.values,
            title: req.body.title,
            owner: req.body.owner,
            structureType: req.body.structureType,
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
                    res.send({ 'successful' : true, 'allBSTs' : allBSTs });                
                }
            });  
        });
    });

    app.post('/api/structure/load-default-structures', function(req, res) {
        bstModel.find({ 'owner': 'default', 'structureType' : req.body.structureType }, function(err, allStructuresOfType) {
            if (err) {
                res.send(err)
            }
            res.json(allStructuresOfType);
        });
    });

    app.post('/api/structure/get-user-structures', function(req, res) {
        bstModel.find({ 'owner': req.body.username, 'structureType' : req.body.structureType }, function(err, allBSTs) {
            if (err) {
                res.send(err)
            }
            res.json(allBSTs);
        });
    });

    app.post('/api/structure/update-structure', function(req, res) {
        bstModel.findByIdAndUpdate(req.body.docId, { 'values' : req.body.updatedStructure.values }, function(err, doc) {
            if (err) {
                res.send({ 'successful' : false, 'error' : err });
            }
            else {
                res.send({ 'successful' : true});
            }
        });
    });

    app.post('/api/structure/update-title', function(req, res) {
        bstModel.findByIdAndUpdate(req.body.docId, { 'title' : req.body.newTitle }, function(err, doc) {
            if (err) {
                res.send({ 'successful' : false, 'error' : err });
            }
            else {
                res.send({ 'successful' : true});
            }
        });
    });

    app.post('/api/structure/delete-structure', function(req, res) {
        bstModel.findByIdAndUpdate(req.body.docId, { 'title' : req.body.newTitle }, function(err, doc) {
            if (err) {
                res.send({ 'successful' : false, 'error' : err });
            }
            else {
                res.send({ 'successful' : true});
            }
        });

        bstModel.find({ '_id' : req.body.docId }).remove( function(err) {
            if(err) {
                res.send({ 'successful' : false, 'error' : err });
            }
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};