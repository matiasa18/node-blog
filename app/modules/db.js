var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db_url = "mongodb://localhost/node-blog";

// passport config
var User = require('../models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(db_url);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + db_url);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongose error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected.');
});

process.on('STGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose connection disconnected via app termination');
    process.exit(0);
  });
});