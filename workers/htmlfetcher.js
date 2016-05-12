// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var Promise = require("bluebird");


archive.readListOfUrls().
  then(function(urls) {
    archive.downloadUrls(urls);
  })
  .catch(err => console.log(err)); 

