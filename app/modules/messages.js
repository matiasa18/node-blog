var flash = require('connect-flash'),
    passport = require('passport');

exports.get = function (req, type) {
  if(typeof req.flash(type) === 'undefined') {
    return null;
  } else {
    return req.flash(type);
  }
}

exports.get_from_passport = function(errors) {
  errors.forEach(function(error) {
    console.log(error);
  });
}

