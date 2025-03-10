const routes = require('express').Router();
const person = require('./person');

routes.get('/', person.getData);

module.exports = routes;