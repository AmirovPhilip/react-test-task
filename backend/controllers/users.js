var Users = require('../models/users');

exports.create = function (req, res) {
    var userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    Users.create(userData, function (err, result) {
        if (err == 'booked') {
            return res.send({error: 'Email' + result.email +' was booked.'});
        } else if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}

exports.login = function (req, res) {
    var userData = {
        email: req.body.email,
        password: req.body.password
    };
    Users.login(userData, function (err, result) {
        if (err == 'wrong_password') {
            return res.send({error: 'Wrong password.'});
        } else if (err == 'user_not_found') {
            return res.send({error: 'This email address is not registered.'});
        } else if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        req.session.user = result.id;
        res.send(result);
    })
}

exports.session = function (req, res, next) {
    if (!req.session.user) return  res.send({error: 'Not Autorizate'});;

    Users.session(req.session.user, function (err, user) {
        if (err) return res.send(500);

        res.send({username: user.username, email: user.email});
    })
}

exports.logout = function (req, res, next) {
    req.session.destroy();
    res.sendStatus(200);
}