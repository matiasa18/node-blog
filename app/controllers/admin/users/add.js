var passport = require('passport'),
    User = require('../../../models/user'),
    flash = require('connect-flash');


module.exports = function(app) {
  app.get('/admin/users/add', function(req, res) {
    res.render('admin/users/add', {title: 'Add User'});
  });

  app.post('/admin/users/add', function(req, res) {
    User.register(new User({
        username: req.body.username,
        brief: req.body.brief,
        email: req.body.email
    }), req.body.password, function (err, user) {
        if (err != null) {
          return res.render('admin/users/add', {user: user});
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
