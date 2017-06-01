var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    cors = require('cors'),
    Task = require('./api/models/stripModel'),
    User = require('./api/models/userModel'),
    bodyParser = require('body-parser');
var config = require('./config');
var morgan = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var routes = require('./api/routes/stripRoutes');
routes(app);

app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);