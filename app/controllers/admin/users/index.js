var messages = require('../../../modules/messages');

module.exports = function(app) {
  app.get('/admin/users', function(req, res) {
    res.render('admin/users/index', {title: 'Users index', successMessages: messages.get(req, 'info'), errorMessages: messages.get(req, 'error')});
  });
}
