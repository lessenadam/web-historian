var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var dir = archive.paths;
var Promise = require("bluebird");
Promise.promisifyAll(fs);

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  fs.readFileAsync(asset)
    .then(function(data) {
      res.writeHead(200, (asset.indexOf('.css') > 0 ? {'Content-Type':'text/css'} : exports.headers));
      res.write(data);
      res.end();
    })
    .catch(function(err) {
      console.log('ERROR1');
      exports.serveAssets(res, dir.siteAssets + '/loading.html');
    });
};

exports.writeAssets = function(res, url) {
  var temp = archive.isUrlInList(url);
  console.log('in archive----------:', temp);
  if (!temp) {
    archive.addUrlToList(url);
  }
  exports.serveAssets(res, dir.archivedSites + '/' + url);
};
    

// As you progress, keep thinking about what helper functions you can put here!
