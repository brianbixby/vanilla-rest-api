'use strict';

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    if(req.method === 'POST' || req.method === 'PUT') {
      var body = '';

      req.on('data', data => {
        body += data.toString();
      });

      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          resolve(req);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });

      req.on('error', err => {
        console.error(err);
        reject(err);
      });

      return;
    }
    resolve();
  });
};

// used resolve at last line in case this file was used as a global middleware on a get route; which it shouldnt be body parser is only necessary on posts and puts; could be reject if eveything was done right

// above returns a new promise object

// middleware

// when you call this function if this works our request is now parsed and it needs to be taken out of that promise with a .then if it is not resolved and it has an error it will go to catch block

// .then - give me resolved promise
//  .catch give me errored promise