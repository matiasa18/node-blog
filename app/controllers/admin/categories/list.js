var passport = require('passport'),
    Category = require('../../../models/category'),
    messages = require('../../../modules/messages');


module.exports = function(app) {
  app.get('/admin/categories/', function(req, res) {
    Category.find({parent: null}).populate('categories').exec(function(err, categories) {
      if (err) throw err;
      res.render('admin/categories/index', {title: 'List Categories', categories: categories, edit: false, inputs: false});
    });
    
  });
}
