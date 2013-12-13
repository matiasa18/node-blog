var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var user_schema = new mongoose.Schema({
  email: String,
  username: String,
  brief: String
});

user_schema.plugin(passportLocalMongoose);

var User = module.exports = mongoose.model('User', user_schema);

