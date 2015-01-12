// Generated by CoffeeScript 1.8.0
(function() {
  var app, bodyParser, dotenv, express, mongoose, morgan, passport;

  dotenv = require('dotenv');

  dotenv.load();

  express = require('express');

  app = express();

  morgan = require('morgan');

  bodyParser = require('body-parser');

  mongoose = require('mongoose');

  passport = require('passport');

  app.set('port', process.env.PORT || 3000);

  app.use(morgan('combined'));

  app.use(bodyParser.json());

  app.use(passport.initialize());

  app.get('/', function(req, res) {
    return res.send("Welcome to Hands@Work!");
  });

  app.use('/api', require('./routes/api_router'));

  mongoose.connect(process.env.MONGODB_URL, function() {
    return app.listen(app.get('port'), function() {
      return console.log("Server is running on port " + (app.get('port')));
    });
  });

}).call(this);