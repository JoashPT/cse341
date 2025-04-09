const router = require('express').Router();
const pokemonControl = require('../controller/pokeController');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', pokemonControl.getAll);
router.get('/:id', pokemonControl.getSingle);
router.post('/', isAuthenticated, validation.savePoke, pokemonControl.createOne);
router.put('/:id', isAuthenticated, validation.savePoke, pokemonControl.updateOne);
router.delete('/:id', isAuthenticated, pokemonControl.eraseOne);

module.exports = router;