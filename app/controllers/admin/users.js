var messages = require('../../modules/messages'),
    User = require('../../models/user');

module.exports = function(app) {
  app.get('/admin/users', function(req, res) {
    User.find(function(err, users) {
      res.render('admin/users/index', {title: 'Users index', success_messages: messages.get(req, 'info'), users: users});
    });
  });

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
  
  app.get('/admin/users/delete/:id', function(req, res) {
    
  });

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
          req.flash('info', 'Your user has been created!');
          res.redirect('/admin/users');
          res.end();
          return;
        }
      }
    );
  });
}
