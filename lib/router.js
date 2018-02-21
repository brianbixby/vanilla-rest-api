'use strict';

const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function() {
  this.routes = {
    // must be uppercase
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
  // these are req.methods
};

Router.prototype.get = function(endpoint, callback) {
//  var note router = new router; note router .get /api/getdata
  this.routes.GET[endpoint] = callback;
  // endpoint /api/cats is in get
  //  /api/cats has a value of callback
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
  // brackets instead of period because thats how you give it a name
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
  // delete- deletes a property on an object
};

// this is passed into createserver call on index; so the server needs to take req, and res params
// need to call Router.route on createserver function
Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJSON(req),
    ])
    // if promise.all rsolves then we hit the then block statement below, if any reject it will skip the then bloack and hit catch block
      .then( () => {
        if (typeof this.route[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }
        console.error('route not found');
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('route not found');
        res.end();
      })
      .catch( err => {
        console.error(err);

        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write('bad request');
        res.end();
      });
    // use bracket notation because it captures a property; this.routes.method/api.cats
    // api/cats is endpoint 
    // app.get('api/cats)is the route
    // this.routes points to routes property in instantiated route object from constructor above
    // method that accepts an array of promises; if any of the promises are rejected promis.all will fail; if all the promises are resilved it will work; allows you to pull value out of promise
  };
};


// router constructor every time there is a new Router object there is a routes parameter
// constructor function with single property of routes, just an object with a nested sub-object, we are going to put data in it

// routes method retuns function with request and response
