var passport = require('passport'),
    Category = require('../../../models/category'),
    messages = require('../../../modules/messages'),
    flash = require('connect-flash');


module.exports = function(app) {
  app.get('/admin/categories/', function(req, res) {
  Category.make_tree(function(categories) {
    res.render('admin/categories/index', {title: 'List Categories', success_messages: messages.get(req, 'info'), categories: categories, edit: false, inputs: false});
    });
  });
}
