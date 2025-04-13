const router = require('express').Router();
const videogameController = require('../controller/videogameController');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', videogameController.getAll);
router.get('/:id', videogameController.getSingle);
router.get('/videogame/:videogame', videogameController.getVideogame);
router.post('/', isAuthenticated, validation.saveVideogame, videogameController.createOne);
router.put('/:id', isAuthenticated, validation.saveVideogame, videogameController.updateOne);
router.delete('/:id', isAuthenticated, videogameController.eraseOne);

module.exports = router;