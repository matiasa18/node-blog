var passport = require('passport');

module.exports = function(app) {
  app.get('/login', function(req, res) {
    res.render('admin/login', {title: "Login", error_messages: req.flash('error')});
  });

  app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'Invalid username or password'}), function(req, res) {
    res.redirect('/admin');
    res.end();
  });
}