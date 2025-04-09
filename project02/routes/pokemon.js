const router = require('express').Router();
const pokemonControl = require('../controller/pokeController');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate');

router.get('/', pokemonControl.getAll);
router.get('/:id', pokemonControl.getSingle);
router.post('/', auth.isAuthenticated, validation.savePoke, pokemonControl.createOne);
router.put('/:id', auth.isAuthenticated, validation.savePoke, pokemonControl.updateOne);
router.delete('/:id', auth.isAuthenticated, pokemonControl.eraseOne);

module.exports = router;