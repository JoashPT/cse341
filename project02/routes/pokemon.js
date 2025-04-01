const router = require('express').Router();
const pokemonControl = require('../controller/pokeController');
const validation = require('../middleware/validate');

router.get('/', pokemonControl.getAll);
router.get('/:id', pokemonControl.getSingle);
router.post('/', validation.savePoke, pokemonControl.createOne);
router.put('/:id', validation.savePoke, pokemonControl.updateOne);
router.delete('/:id', pokemonControl.eraseOne);

module.exports = router;