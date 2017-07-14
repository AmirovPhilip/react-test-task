var mongoose = require('../db/db'),
    Schema = mongoose.Schema;

var schema = new Schema({
    id: mongoose.Schema.ObjectId,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('Marker', schema);