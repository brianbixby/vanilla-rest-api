'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  // validation checks, check the params as part of these functions
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!item) return Promise.reject(new Error('expected item'));
  if(!storage[schemaName]) storage[schemaName] = {};
  //  if there is not already a notes property on this project create the notes property as an empty object so i can fillit with data, the data i fill it with is the item

  storage[schemaName][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if(!schemaName) return(new Error('expected schema name'));
    if(!id) return(new Error('expected id'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));

    var item = schema[id];

    if(!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

// schema name is the resource ex. notes, cats, lists

// storage: {
//   notes: {
//     id: ,
//     name: ,
//     date: ,
//   }
// }