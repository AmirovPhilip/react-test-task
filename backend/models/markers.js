var ObjectID = require('mongodb').ObjectID;
var db = require('../db/db');
var Marker = require('../schema/marker');

exports.all = function (cb) {
    Marker.find().exec(function (err, result) {
        cb(err, result);
    })
}

exports.addMore = function (markers, cb) {
    Marker.collection.insert(markers, function (err, result) {
        cb(err, result);
    })
}

exports.delete = function (id, cb) {
    Marker.remove( { '_id' : ObjectID(id) }, function (err, result) {
        cb(err, result);
    })
}