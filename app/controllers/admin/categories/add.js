var passport = require('passport'),
    Category = require('../../../models/category'),
    messages = require('../../../modules/messages');


module.exports = function(app) {
  app.get('/admin/categories/add', function(req, res) {
    Category.find({parent: null}).populate('categories').exec(function(err, categories) {
      if (err) throw err;
      console.log(categories);
      res.render('admin/categories/form', {title: 'Add Category', category: new Category(), path: '/admin/categories/add', categories: categories, edit: false});  
    });
    
  });

  app.post('/admin/categories/add', function(req, res) {
    if (req.body.parent_id != 0 && typeof req.body.parent_id != 'undefined') {
      Category.findOne({_id: req.body.parent_id}, function(err, parent_category) {
        if (err) throw err;
        console.log(parent_category);
        var category = new Category({name: req.body.name, parent: parent_category});
        category.save(function(err, category) {
          if (err) throw err;
          console.log('saved');
          parent_category.categories.push(category);
          parent_category.save(function(err) {
            console.log(err);
          });
        });
        
      });
    } else {
      var category = new Category({name: req.body.name, parent: null});
      category.save(function (err) {
      if (err != null) {
        err = messages.get_from_model(err);
        return res.render('admin/categories/form', {category: category, error_messages: [err], path: '/admin/categories/add'});
      } else {
        res.redirect('/admin/categories');
        res.end();
        return;
      }
    });  
    }
    
  });
}
