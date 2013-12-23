var Category = require('../../../models/category'),
    messages = require('../../../modules/messages');


module.exports = function(app) {
  app.get('/admin/categories/add', function(req, res) {
    Category.make_tree(function(categories) {
      res.render('admin/categories/form', {title: 'Add Category', category: new Category(), path: '/admin/categories/add', categories: categories, edit: false, inputs: true});  
    });
    
  });

  app.post('/admin/categories/add', function(req, res) {
    if (req.body.parent_id != 0 && typeof req.body.parent_id != 'undefined') {
      Category.findOne({_id: req.body.parent_id}, function(err, parent_category) {
        if (err) throw err;
        var category = new Category({name: req.body.name, parent: parent_category});
        category.save(function(err, category) {
          if (err) throw err;
          parent_category.categories.push(category);
          parent_category.save(function(err) {
            if (err) throw err;
            req.flash('info', 'Category saved');
            res.redirect('/admin/categories/');
            res.end();
            return;
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
        req.flash('info', 'Category saved');
        res.redirect('/admin/categories/');
        res.end();
        return;
      }
    });  
    }
    
  });
}
