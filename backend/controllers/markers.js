var Markers = require('../models/markers');

exports.all = function (req, res) {
    Markers.all(function (err, markers) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(markers);
    })
}

exports.addMore = function (req, res) {
    var markers = req.body;
    var insertArr = [];

    for(var i = 0; i < markers.length; i++) {
        if(markers[i].action == 'insert'){
            delete markers[i].action;
            insertArr.push(markers[i]);
        }
    }
    if(insertArr.length) {
        Markers.addMore(insertArr, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(markers);
        })
    } else {
        return res.send(markers);
    }
}

exports.delete = function (req, res) {
    Markers.delete(req.params.id, function (err, result) {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}