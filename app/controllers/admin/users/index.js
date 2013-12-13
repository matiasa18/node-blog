var flash = require('connect-flash');

module.exports = function(app) {
  app.get('/admin/users', function(req, res) {
    res.render('admin/users/index', {title: 'Users index', messages: req.flash('info')});
  });
}
