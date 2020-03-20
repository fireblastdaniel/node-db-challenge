const knex = require('knex');

const knexfile = require('../knexfile.js');

const environment = process.env.NODE_ENV || 'development';

const knexConfig = knexfile[environment];

module.exports = knex(knexConfig);
