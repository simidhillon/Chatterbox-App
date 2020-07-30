var express = require('express');
var db = require('./db');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');
var cors = require('cors');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.set('port', 3000);

app.use(morgan('dev'));
app.use(parser.json());
app.use(cors());

app.use('/classes', router);

app.use(express.static(__dirname + '/../client'));

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}