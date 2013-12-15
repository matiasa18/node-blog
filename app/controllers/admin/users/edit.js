var passport = require('passport'),
    User = require('../../../models/user'),
    flash = require('connect-flash'),
    messages = require('../../../modules/messages');


module.exports = function(app) {
  app.get('/admin/users/edit/:username', function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
      if(!user) res.redirect('/admin/users');
      res.render('admin/users/form', {title: 'Edit user', user: user, path: '/admin/users/edit/' + req.params.username}); 
    });
  });

  app.post('/admin/users/edit/:username', function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
      user.username = req.body.username;
      user.email = req.body.email;
      user.brief = req.body.brief;
      if(req.body.password) user.password = req.body.password;
      user.save(function(err, new_user) {
        if(!err) {
          res.redirect('/admin/users');
          res.end();
        } else {
          err = messages.get_from_model(err);
          return res.render('admin/users/form', {user: user, error_messages: [err], path: '/admin/users/edit/' + req.params.username});
        }
      });
    });
    /*var user = new User();
    user.username = req.body.username;
    user.brief = req.body.brief;;
    user.email = req.body.email;
    User.register(user, req.body.password, function (err) {
        console.log(err);
        if (err != null) {
          // Email is already in use?
          err.message = (err.message === 'Validation failed')? 'A user with the email ' + user.email + ' is already registered, please take another one' : err.message;
          return res.render('admin/users/form', {user: user, error_messages: [err.message]});
        } else {
          req.flash('info', 'Your user has been created!');
          res.redirect('/admin/users');
          res.end();
          return;
        }
      }
    );*/
  });
}
