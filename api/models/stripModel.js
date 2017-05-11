'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StripSchema = new Schema({
    title: {
        type: String
    },
    frontImage: {
        type: String
    },
    mainImage: {
        type: String
    },
    imageYear: {
        type: Number
    },
    imageMonth: {
        type: Number
    }
});

module.exports = mongoose.model('strips', StripSchema);