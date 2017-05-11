'use strict';

var mongoose = require('mongoose'),
    Task = mongoose.model('strips');

exports.list_all_strips = function (req, res) {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    // res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var year = req.query.year;
    var month = req.query.month;
    var limit = 5;

    if (year && month) {
        Task.find({imageYear: year, imageMonth: month}, {}, {limit: limit}, function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    } else if (year) {
        Task.find({imageYear: year}, {}, {sort: {"imageMonth": -1}, limit: limit}, function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    } else if (month) {
        Task.find({imageMonth: month}, {}, {sort: {"imageYear": -1}, limit: limit}, function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    } else {
        var offset = req.query.offset ? req.query.offset : 0;
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
};

exports.read_a_task = function (req, res) {
    Task.findById(req.params.taskId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};