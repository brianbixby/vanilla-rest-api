'use strict';

const http =require('http');
// creating http servers and dealing with http req's; gives us access to req and res object and create server
const Note = require('./model/note.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
//  port actually runs server
const router = new Router();

router.get('/api/note', function(req, res) {
  if(req.url.query.id) {
    // re.url.query come from parser
    storage.fetchItem('note', req.url.query.id)
    // fetch item returns a promise, get value of a promise of .then block
      .then( note => {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(JSON.stringify(note));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });

        res.write('route not found');
        return;
      });
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
});
// accepts endpoint and callback

router.post('/api/note', function(req, res) {
  try {
    var note = new Note(req.body.name, req.body.content);
    storage.createItem('note', note);
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write(JSON.stringify(note));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
});

const server = http.createServer(router.route());
// callback function param will be passed in from router files

server.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});




