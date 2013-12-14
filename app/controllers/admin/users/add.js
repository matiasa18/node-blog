var passport = require('passport'),
    User = require('../../../models/user'),
    flash = require('connect-flash'),
    messages = require('../../../modules/messages');


module.exports = function(app) {
  app.get('/admin/users/add', function(req, res) {
    res.render('admin/users/add', {title: 'Add User', user: new User()});
  });

  app.post('/admin/users/add', function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.brief = req.body.brief;;
    user.email = req.body.email;
    User.register(user, req.body.password, function (err) {
        console.log(err);
        if (err != null) {
          // Email is already in use?
          err.message = (err.message === 'Validation failed')? 'A user with the email ' + user.email + ' is already registered, please take another one' : err.message;
          return res.render('admin/users/add', {user: user, error_messages: [err.message]});
        } else {
          req.flash('info', 'Your user has been created!');
          res.redirect('/admin/users');
          res.end();
          return;
        }
      }
    );
  });
}
