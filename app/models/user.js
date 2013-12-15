var mongoose = require('mongoose'),
    unique_validator = require('mongoose-unique-validator'),
    bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10;;

var user_schema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  brief: String,
  password: {required: true, type: String }
});

user_schema.plugin(unique_validator);

user_schema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

user_schema.methods.compare_password = function(candidate_password, cb) {
  bcrypt.compare(candidate_password, this.password, function(err, is_match) {
    if(err) return cb(err);
    cb(null, is_match);
  });
};

var User = module.exports = mongoose.model('User', user_schema);

