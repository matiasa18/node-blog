var mongoose = require('mongoose'),
    auto_increment = require('mongoose-auto-increment'),
    object_id = mongoose.Schema.ObjectId;

var category_schema = new mongoose.Schema({
  name: {required: true, type: String},
  parent: {type: object_id, ref: 'Category' },
  categories: [ {type: object_id, ref: 'Category'} ]
});

var Category = module.exports = mongoose.model('Category', category_schema);