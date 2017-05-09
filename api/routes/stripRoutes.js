'use strict';

module.exports = function(app) {
    var stripList = require('../controllers/stripController');

    // todoList Routes
    app.route('/strips')
        .get(stripList.list_all_strips);

    app.route('/tasks/:taskId')
        .get(stripList.read_a_task)
        .put(stripList.update_a_task)
        .delete(stripList.delete_a_task);
};