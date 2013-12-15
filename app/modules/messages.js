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

exports.get_from_model = function(err) {
  console.log(err);
  if(typeof err.errors === 'undefined' && typeof err.message === 'undefined') {
    return 'Uknown error';
  } else if(typeof err.message != 'undefined' && typeof err.errors === 'undefined') {
    return err.message;
  } else {
    for (var key in err.errors) {
      if(err.errors[key]['message'] === 'unique') {
        return 'The ' + key + ' is already in use and must be unique, please choose another one';
      }
    }
  }
}

exports.get_from_unique_validator = function(errors) {
  console.log(errors);
  errors.foreach(function(item) {
    if(item.message === 'unique') {
      return 'There\'s already an object with ' + item.path + ' as ' + item.value + ' defined, please choose another one.';
    }
  });
}