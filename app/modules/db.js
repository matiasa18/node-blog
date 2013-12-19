var mongoose = require('mongoose'),
    auto_increment = require('mongoose-auto-increment');

exports.mongoose = mongoose;

var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/node-blog';

var mongo_options = { db: { safe: true }};

var connection = mongoose.connect(uristring, mongo_options, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + uristring);
  }
});

auto_increment.initialize(connection);

var User = require('../models/user');