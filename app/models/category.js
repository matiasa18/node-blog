var mongoose = require('mongoose'),
    auto_increment = require('mongoose-auto-increment'),
    object_id = mongoose.Schema.ObjectId;

var category_schema = new mongoose.Schema({
  name: {required: true, type: String},
  parent: {type: Number, ref: 'Category' },
  categories: [ {type: Number, ref: 'Category'} ]
});

category_schema.plugin(auto_increment.plugin, 'Category');

category_schema.static('make_tree', function(callback) {
  Category.find(function(err, categories) {
    if (err) throw err;
    var parents_array = [];
    for(var i = 0; i < categories.length; i++) {
      var category = categories[i];
      if (category.parent == null || category.categories.length) {
        parents_array.push({
          _id: categories[i]._id,
          name: categories[i].name,
          categories: [],
          parent: categories[i].parent
        });
      }
    }

    for(var x = parents_array.length -1; x >= 0; x--) {
      for(var y = 0; y < categories.length; y++) {
        if (categories[y].parent === parents_array[x]._id && parents_array[x].parent != null) {
          console.log('adding ' + categories[y].name + ' to ' + parents_array[x].name);
          parents_array[x].categories.push({
            _id: categories[y]._id,
            name: categories[y].name,
            parent: categories[y].parent,
            categories: categories[y].categories
          });
        }
      }
    }

    for(var x = parents_array.length -1; x >= 0; x--) {
      for(var y = parents_array.length -1; x >= 0; x--) {
        if(parents_array[y].parent == parents_array[x]._id) {
          parents_array[x].categories.push({
            _id: parents_array[y]._id,
            name: parents_array[y].name,
            categories: parents_array[y].categories,
            parent: parents_array[y].parent
          });
        }
      }
    }

    // Remove parents which have parents. 
    for(var i = parents_array.length - 1; i >= 0; i--) {
      if (parents_array[i].parent) {
        parents_array.splice(i, 1);
      }
    }

    callback(parents_array);
  });
});

var Category = module.exports = mongoose.model('Category', category_schema);