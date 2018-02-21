'use strict';

const request = require('superagent');
// library for allowing us to make rest requests; does exactly what express router does
// has a ton of great methods, attach specific headers
require('jest');
// gives us jests globales ex. expect
require('../server.js');

describe('Notes Routes', function() {
  var note = null;
  // // note is on outer global scope and can be used anywhere below
  describe('POST: /api/note', function() {
    it('should retun a note', function(done) {
      // done is meant for aynchronous testing
      request.post('localhost:3000/api/note')
        .send({ name: 'test name', content: 'test content'})
        // .send is saying req.body = 
        .end((err, res) => {
          if (err) return done(err);
          note = JSON.parse(res.text);
          console.log('res: ', res);
          console.log('res text: ', res.text);
          // console.log('res: ', res);
          // turn into object so you can get the status, name and content
          // res.write is captured with .text
          // the note is a string
          expect(res.status).toEqual(200);
          expect(note.name).toEqual('test name');
          expect(note.content).toEqual('test content');
          done();
        });
    });
  });

  describe('GET: /api/note', function() {
    it('should return a note', function(done) {
      request.get(`localhost:3000/api/note?id=${note.id}`)
      // use a query string to get note
        .end((err, res) => {
          if(err) return done(err);
          note = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(note.name).toEqual('test name');
          expect(note.content).toEqual('test content');
          done();
        });
    });
  });
});
