var async = require('async');
var ObjectID = require('mongodb').ObjectID;
var Marker = require('../schema/marker');

exports.all = function (cb) {
    Marker.find({}, function (err, result) {
        cb(err, result);
    })
}

exports.addMore = function (markers, cb) {
    async.each(markers, function (markerData, cb) {
        var marker = new Marker(markerData);
        marker.save(cb);
    }, cb);
}

exports.delete = function (id, cb) {
    try {
        var id = new ObjectID(id);
    } catch (e) {
        return console.log(e);
    }
    Marker.remove( { '_id' : ObjectID(id) }, function (err, result) {
        cb(err, result);
    })
}