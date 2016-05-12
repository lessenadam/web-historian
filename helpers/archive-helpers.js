var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) { 
      console.log('could not read from sites.txt file');
      throw err;
    }
    console.log('DATA FROM FILE-------', data.split('\n'));
    cb(data.split('\n'));
  });
};

exports.isUrlInList = function(target, cb) {
  console.log(cb);  
  exports.readListOfUrls(function(urls) {
    var found = false;
    _.each(urls, function(url) {
      if (url === target) {
        found = true;
      }
    });
    cb(found);  
  });
};

exports.addUrlToList = function(newURL, cb) {
  fs.appendFile(exports.paths.list, newURL, 'utf8', err => {
    if (err) {
      throw err;
    }
    console.log('Data was successfully added!');
    cb();
  });
};

exports.isUrlArchived = function(target, cb) {
  fs.access(exports.paths.archivedSites + '/' + target, fs.F_OK, err => cb(err ? false : true));
};


fs.access('/etc/passwd', fs.R_OK | fs.W_OK, (err) => {
  console.log(err ? 'no access!' : 'can read/write');
});






exports.downloadUrls = function() {
};
