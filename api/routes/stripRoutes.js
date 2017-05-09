'use strict';

module.exports = function(app) {
    var stripList = require('../controllers/stripController');

    // todoList Routes
    app.route('/strips')
        .get(stripList.list_all_strips);
};