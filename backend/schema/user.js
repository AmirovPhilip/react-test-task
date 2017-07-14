var crypto = require('crypto');
var mongoose = require('../db/db'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword;})

schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
}

schema.statics.authorize = function(userData, cb) {
    var User = this;

    User.findOne({email: userData.email}, function (err, user) {
        if (err) {
            cb(err, user);
        }
        if (user) {
            if (user.checkPassword(userData.password)) {
                cb(null, user);
            } else {
                cb('wrong_password');
            }
        } else {
            cb('user_not_found');
        }

    })
}

module.exports = mongoose.model('User', schema);