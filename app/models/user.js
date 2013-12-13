var mongoose = require('mongoose');

var user_schema = new mongoose.Schema({
  
 Country: String,
 GroupName: String,
 CreatedOn: Date
});

var Team = module.exports = mongoose.model('Team', user_schema);