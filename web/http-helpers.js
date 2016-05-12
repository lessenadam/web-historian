var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var dir = archive.paths;

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  console.log('ASSET IS ===========', asset);

  fs.readFile(asset, function(err, data) {
    if (err) {
      console.log('ERROR1');
      exports.serveAssets(res, dir.siteAssets + '/loading.html');
    } else {
      res.writeHead(200, exports.headers);
      res.write(data);
      res.end();
    }
  });
};

exports.writeAssets = function(res, message, callback) {
  archive.isUrlInList(message, function(inList) {
    if (!inList) {
      fs.appendFile(dir.list, message + '\n', 'utf8', err => {
        if (err) {
          console.log('ERRR2--------', err);
        }
        console.log('Data was successfully added!');
      }); 
    }
  });
  
  exports.serveAssets(res, dir.archivedSites + '/' + message);

};

// As you progress, keep thinking about what helper functions you can put here!
