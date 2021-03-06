// set up ========================
var express         = require('express');
var app             = express();                               // create our app w/ express
var mongoose        = require('mongoose');                     // mongoose for mongodb
var morgan          = require('morgan');             // log requests to the console (express4)
var bodyParser      = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride  = require('method-override'); // simulate DELETE and PUT (express4)
var session         = require('client-sessions');

// configuration =================
var dbURI = 'mongodb://localhost:27017/DataStructureVisualizer'; 

mongoose.connection.on('connecting', function ()    { console.log('MongoDB: Trying: ' + dbURI);                             }); 
mongoose.connection.on('connected', function ()     { console.log('MongoDB: Successfully connected to: ' + dbURI);          }); 
mongoose.connection.on('error',function (err)       { console.log('MongoDB: ERROR connecting to: ' + dbURI + ' - ' + err);  }); 
mongoose.connection.on('close',function (err)       { console.log('MongoDB: Connection Closed');                            }); 
mongoose.connection.on('reconnected', function ()   { console.log('MongoDB: Database link was reconnected');                });
mongoose.connection.on('disconnected', function ()  { console.log('MongoDB: The connection was ended on: ' + dbURI );       });
mongoose.connect(dbURI);

app.use(session({
    cookieName: "userLoginInfo",
    secret: 'h)Wf1g=2(~n>Y:}As_4uQ[!CHJ|ko$e6Dd]@5ORa9<mNX%=D|<M4mcs[{V_duW`L+c(5O+7|,O9`rbN,4!7:suVP=dbPq5>~%Hfc!xTLZ+Oj;0FQ]#U0CZFD(7Li~&P~',
    duration: 5 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes ======================================================================
require('./app/Routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");