var mongoose = require('mongoose');

exports.mongoose = mongoose;

var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/node-blog';

var mongo_options = { db: { safe: true }};

mongoose.connect(uristring, mongo_options, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + uristring);
  }
});

var User = require('../models/user');