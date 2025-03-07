const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.jackRoute);
routes.get('/santa', lesson1Controller.santaRoute);
routes.get('/tooth', lesson1Controller.toothRoute);
routes.get('/easter', lesson1Controller.easterRoute);
routes.get('/sand', lesson1Controller.sandRoute);

module.exports = routes;