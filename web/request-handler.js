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

  } else if (url === '/styles.css' && method === 'GET') {
    // if (url.indexOf('css') > 0) {
    console.log('SERVIING CSS!!!!!!!!!!!!!!!!!!');
    webs.serveAssets(res, dir.siteAssets + url);

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
