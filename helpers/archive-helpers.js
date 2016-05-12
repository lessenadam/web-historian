var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
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


exports.downloadUrls = function(array) {
  //loop array 
  _.each(array, function(url) {
    exports.isUrlArchived(url, function(alreadyArchived) {
      if (!alreadyArchived) {
        // code for url request 
        var options = {
          host: url
        };

        var callback = function(response) {
          var str = '';

          //another chunk of data has been recieved, so append it to `str`
          response.on('data', function (chunk) {
            str += chunk;
          });

          //the whole response has been recieved, so we just print it out here
          response.on('end', function () {
            // console.log(str);
            fs.appendFile(exports.paths.archivedSites + '/' + url, str, 'utf8', err => {
              if (err) {
                throw err;
              }
              console.log('New file added to the archives!');
            });
          });
        };

        http.request(options, callback).end();

      }
    });
  });
    // call is UrlArchived
      // if not archived, execute script to go get 
      // else do nothing 

};





