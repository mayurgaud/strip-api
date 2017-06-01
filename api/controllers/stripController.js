'use strict';

var mongoose = require('mongoose'),
    Task = mongoose.model('strips');
var jwt = require('jsonwebtoken');
var config = require('../../config');
exports.list_all_strips = function (req, res) {
    var token = req.body.token || req.query.token || req.headers['authorization'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                var year = req.query.year;
                var month = req.query.month;
                var limit = 5;
                var offset = req.query.offset ? req.query.offset : 0;

                if (year && month) {
                    Task.find({imageYear: year, imageMonth: month}, {}, {
                        skip: parseInt(offset),
                        limit: limit
                    }, function (err, task) {
                        if (err)
                            res.send(err);
                        res.json(task);
                    });
                } else if (year) {
                    Task.find({imageYear: year}, {}, {
                        sort: {"imageMonth": -1},
                        skip: parseInt(offset),
                        limit: limit
                    }, function (err, task) {
                        if (err)
                            res.send(err);
                        res.json(task);
                    });
                } else if (month) {
                    Task.find({imageMonth: month}, {}, {
                        sort: {"imageYear": -1},
                        skip: parseInt(offset),
                        limit: limit
                    }, function (err, task) {
                        if (err)
                            res.send(err);
                        res.json(task);
                    });
                } else {
                    Task.find({}, {}, {
                            sort: {"imageYear": -1, "imageMonth": -1},
                            skip: parseInt(offset), limit: limit
                        },
                        function (err, task) {
                            if (err) {
                                return res.send(err);
                            }
                            res.json(task);
                        });
                }
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

};