'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean
    }
});

module.exports = mongoose.model('user', UserSchema);