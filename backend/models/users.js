var async = require('async');
var User = require('../schema/user');

exports.create = function (userData, cb) {
    var user = new User(userData);
    User.findOne({email: userData.email}, function (err, result) {
        if (result) {
           cb('booked', user);
        } else {
            user.save(function (err, user, result) {
                cb(err, result);
            })
        }

    })
}

exports.login = function (userData, cb) {
    User.authorize(userData, function (err , user) {
        cb(err, user);
    })
}

exports.session = function (id, cb) {
    User.findById(id, function (err , user) {
        cb(err, user);
    })
}