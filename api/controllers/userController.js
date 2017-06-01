'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('user');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var config = require('../../config');
exports.addUser = function (req, res) {
// create a sample user
    var nick = new User({
        name: 'mayuradmin',
        password: passwordHash.generate('frontech9'),
        admin: true
    });

    // save the sample user
    nick.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({success: true});
    });
};

exports.authenticate = function (req, res) {
    // find the user
    User.findOne({
        name: req.body.name
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
            if (!passwordHash.verify(req.body.password, user.password)) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    token: token
                });
            }

        }

    });
};