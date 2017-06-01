'use strict';

module.exports = function (app) {
    var stripList = require('../controllers/stripController');
    var user = require('../controllers/userController');
    // add user route
    app.route('/authenticate').post(user.authenticate);
    // todoList Routes
    app.route('/strips')
        .get(stripList.list_all_strips);

};