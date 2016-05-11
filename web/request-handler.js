var path = require('path');
var archive = require('../helpers/archive-helpers');
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
   // check if we have the assets to serve 
   // even if we don't, serveAssets will send back a 404 
    webs.serveAssets(res, dir.archivedSites + url);

  } else if (method === 'POST') {
    var body = '';

    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {
      var post = body;
      console.log('post is---------', post);
      var postURL = post.slice(4);
      console.log('postURL is---------', postURL);
      console.log('typeof postURL is---------', typeof postURL);
      webs.writeAssets(res, postURL);
    });


  } else {
    res.writeHead(404);
    res.end('Not a valid URL');
  }
};
