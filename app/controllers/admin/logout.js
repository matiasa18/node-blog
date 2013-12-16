var passport = require('passport');

module.exports = function(app) {
  app.get('/admin/logout', function(req, res) {
    req.logOut();
    req.flash('info', 'Successfully logged out');
    res.redirect('/login');
  });
}