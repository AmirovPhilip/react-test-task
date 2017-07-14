var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.database, {
    useMongoClient: true,
});

mongoose.connection.on('error', console.error.bind(console, 'Mongo connection error:'));

module.exports = mongoose;