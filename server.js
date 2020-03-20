const express = require('express');
const db = require('./data/db-config.js');

const projectRouter = require('./projects/projectRouter.js');

const server = express();

server.use(express.json());
server.use('/api/projects', projectRouter);

module.exports = server;
