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
  });
}
