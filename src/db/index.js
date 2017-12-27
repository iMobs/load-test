const config = require('../../knexfile');
const knex = require('knex')(config[process.env.NODE_ENV]);
const db = require('bookshelf')(knex);

module.exports = db;
