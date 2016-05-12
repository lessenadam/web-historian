var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var webs = require('../web/http-helpers');
var dir = archive.paths;
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var url = req.url;
  var method = req.method;
  console.log('Serving request ' + method + ' on URL ' + url + '\n');

  if (url === '/' && method === 'GET') {
    webs.serveAssets(res, dir.siteAssets + '/index.html');
  } else if (method === 'GET') {
    // if (url.indexOf('css') > 0) {
    fs.readFile(dir.siteAssets + url, function(err, data) {
      if (err) {
        console.log('ERROR1--------', err);
        res.writeHead(404, exports.headers);
        res.write('File not found');
      } else {
        res.writeHead(200, {'Content-Type':'text/css'});
        res.write(data);
      }
      res.end();
    });
  } else if (method === 'POST') {
    var body = '';

    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {
      var post = body;
      var postURL = post.slice(4);
      console.log('postURL is---------', postURL);
      webs.writeAssets(res, postURL);
    });

  } else {
    res.writeHead(404);
    res.end('Not a valid URL');
  }
};
