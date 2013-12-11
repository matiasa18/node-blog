var mongoose = require('mongoose');

var team_schema = new mongoose.Schema({
 Country: String,
 GroupName: String,
 CreatedOn: Date
});

var Team = module.exports = mongoose.model('Team', team_schema);