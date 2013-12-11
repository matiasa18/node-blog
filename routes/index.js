var fs = require('fs');

module.exports = function(app) {
  recursive_require(__dirname, app);

  function recursive_require(directory, app) {
    fs.readdirSync(directory).forEach(function(file) {
      if (fs.lstatSync(directory + '/' + file + '/').isDirectory()) {
        var has_no_js_files = false;
        directory = directory + '/' + file + '/'; 

        console.log('Scanning recursively on ' + directory);

        // We run across the directory to check if there are any js files.
        fs.readdirSync(directory).forEach(function(file) {
          console.log('Reading file/directory ' + file);
          if (file.match(/\.js$/g)) {
            has_no_js_files = true;
            console.log('Found js files on directory ' + directory);
          }
        });

        // If the folder has no js files, we take in mind that there are other folders inside
        // so we scan the folder recursively.
        if (!has_no_js_files) {
          console.log('No JS files found on ' + directory + ' going to scan recursively');
          recursive_require(directory.substr(0, directory.lastIndexOf('/')));
        } else {
          // Otherwise, we require the directory taking in mind that we have just js files.
          console.log('Found JS files on ' + directory + ', require them');
          require(directory)(app);
        }
      }
    });
  }
}
/*var mongoose = require('mongoose'),
    Team = mongoose.model('Team');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {title: "Titulo"});
  });*/
  /*
  exports.index = function (req, res) {
    Team.create({
      Country : "England",
      GroupName: "D",
      CreatedOn: Date.now()
    }, function(err, team) {
      var strOutput;
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      if (err) {
        console.log(err);
        strOutput = 'Oh dear, we\'ve got an error';
      } else {
        console.log('Team created: ' + team);
        strOutput = team.Country + ' created in Group ' + team.GroupName + '\nat ' + team.CreatedOn;
      }
      res.write(strOutput);
      res.end();
    });
  };*/