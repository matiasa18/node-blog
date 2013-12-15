var flash = require('connect-flash'),
    passport = require('passport');

exports.get = function (req, type) {
  if(typeof req.flash(type) === 'undefined') {
    return null;
  } else {
    return req.flash(type);
  }
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