'use strict';

const uuidv4 = require('uuid/v4');

// const Note = module.exports = function(name, content) {
module.exports = function(name, content) {
  if(!name) throw new Error('expected name');
  if(!content) throw new Error('expected content');

  this.id = uuidv4();
  this.name = name;
  this.content = content;
};