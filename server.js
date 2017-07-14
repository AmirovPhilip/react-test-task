var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var morgan = require('morgan');
var bluebird = require('bluebird');

var mongoose = require('./backend/db/db');

var config = require('./backend/config')

var markersController = require('./backend/controllers/markers');
var userController = require('./backend/controllers/users');

var app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: config.session.secret,
    key:    config.session.key,
    cookie: config.session.cookie,
    resave: true,
    saveUninitialized: true,
    store:  new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use("/build", express.static(__dirname + '/build'));
app.use(function(req, res, next) {
    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
    next();
})

app.get('/markers', markersController.all);
app.put('/addmarkers', markersController.addMore);
app.delete('/marker/:id', markersController.delete);
app.post('/createuser', userController.create);
app.post('/login', userController.login);
app.get('/session', userController.session);
app.post('/logout', userController.logout);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(config.port, function() {
    console.log('API app started on ' + config.port);
})
