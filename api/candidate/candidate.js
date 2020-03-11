const {listAll} = require('./listAll');
const {getById} = require('./getById');
const {submit} = require('./submit');

console.log('got to index');
module.exports.getById = getById;
module.exports.listAll = listAll;
module.exports.submit = submit;
