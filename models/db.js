var mongoose = require('mongoose');

var db_url = "mongodb://localhost/node-blog";

mongoose.connect(db_url);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + db_url);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongose error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected.');
});

process.on('STGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose connection disconnected via app termination');
    process.exit(0);
  });
});

require('./team');