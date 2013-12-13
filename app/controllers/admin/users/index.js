var messages = require('../../../modules/messages'),
    User = require('../../../models/user');

module.exports = function(app) {
  app.get('/admin/users', function(req, res) {
    User.find(function(err, users) {
      res.render('admin/users/index', {title: 'Users index', successMessages: messages.get(req, 'info'), errorMessages: messages.get(req, 'error'), users: users});
    });
  });
}
