var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use("/build", express.static(__dirname + '/build'));


app.get('/markers', function(req, res) {

    db.collection('markers').find().toArray(function (err, result) {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result);
    })

})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})


app.put('/addmarkers', function(req, res) {

    var markers = req.body;
    var insertArr = [];

    for(var i = 0; i < markers.length; i++) {
        if(markers[i].action == 'insert'){
            delete markers[i].action;
            insertArr.push(markers[i]);
        }
    }
    if(insertArr.length) {
        db.collection('markers').insertMany(insertArr, function (err, result) {
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(markers);
        })
    } else {
        return res.send(markers);
    }

})

app.delete('/marker/:id', function(req, res) {

    db.collection('markers').deleteOne(
        { '_id' : ObjectID(req.params.id) },
        function (err, result) {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })

})

MongoClient.connect('mongodb://localhost:27017/myapi', function (err, database) {
    if(err) {
        return console.log(err);
    }
    db = database;
    app.listen(8090, function() {
        console.log('API app started on 8090');
    })
})