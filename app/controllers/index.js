var fs = require('fs'),
    required_files = [];


module.exports = function(app) {
  recursive_require(__dirname, __dirname, app);

  function recursive_require(directory, base_dir, app) {
    fs.readdirSync(directory).forEach(function (input) {
      var next_directory = directory + '/' + input + '/';
      // If we are on the base dir, we ignore the index.js file
      if (!(required_files.indexOf(base_dir + '/index') > -1)) {
        required_files.push(base_dir + '/index');  
      }

      // Check if it's a directory
      if (fs.lstatSync(next_directory).isDirectory()) {
        // We require it recursively
        console.log('Reading directory ' + next_directory);
        recursive_require(next_directory.substr(0, next_directory.lastIndexOf('/')), base_dir, app);
      } else {
        // We require all (except the index.js file if the var is set to true) js files on folder
        require_files(directory, app);
        return;
      }
    });
  }

  function require_files(directory, app) {
    fs.readdir(directory, function(err, files) {
      files.forEach(function(file) {
        if (file.match(/\.js$/g)) {
          var file_path = directory + '/' + file;
          file_path = file_path.substr(0, file_path.indexOf('.js'));
          if (required_files.indexOf(file_path) == -1) {
            required_files.push(file_path);
            require(file_path)(app);
          }
        }
      });
    });
    return;
  }
}