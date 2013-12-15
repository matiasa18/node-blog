var passport = require('passport'),
    User = require('../../../models/user'),
    flash = require('connect-flash'),
    messages = require('../../../modules/messages');


module.exports = function(app) {
  app.get('/admin/users/add', function(req, res) {
    res.render('admin/users/form', {title: 'Add User', user: new User(), path: '/admin/users/add'});
  });

  app.post('/admin/users/add', function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.brief = req.body.brief;;
    user.email = req.body.email;
    user.password = req.body.password
    user.save(function (err) {
        console.log(err);
        if (err != null) {
          err = messages.get_from_model(err);
          return res.render('admin/users/form', {user: user, error_messages: [err], path: '/admin/users/add'});
        } else {
          //req.flash('info', 'Your user has been created!');
          res.redirect('/admin/users');
          res.end();
          return;
        }
      }
    );
  });
}
