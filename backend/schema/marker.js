var mongoose = require('mongoose');

var Marker = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('Marker', Marker);