var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var bluebird = require('bluebird');

var config = require('./backend/config')

var db = require('./backend/db/db');

var markersController = require('./backend/controllers/markers');

var app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use("/build", express.static(__dirname + '/build'));


app.get('/markers', markersController.all);
app.put('/addmarkers', markersController.addMore);
app.delete('/marker/:id', markersController.delete);


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})


db.connect(config.database, function (err) {
    if(err) {
        return console.log(err);
    }

    app.listen(config.port, function() {
        console.log('API app started on ' + config.port);
    })
})