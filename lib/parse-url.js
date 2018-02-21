'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  req.url = parseUrl(req.url);
  // url parser gives you path name, base and query string
  req.url.query = parseQuery(req.url.query);
  // key value pairs for all query string components
  return Promise.resolve(req);
};


// purpose parse url and grab query tring parameter

// no need to wrap in  promise reject or resolve wrapper because its so simple