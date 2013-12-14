var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passport_local_mongoose = require('passport-local-mongoose'),
    unique_validator = require('mongoose-unique-validator');

var user_schema = new mongoose.Schema({
  email: {type: String, unique: true},
  username: String,
  brief: String
});

user_schema.plugin(passport_local_mongoose);
user_schema.plugin(unique_validator);


var User = module.exports = mongoose.model('User', user_schema);

