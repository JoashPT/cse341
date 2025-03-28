const router = require('express').Router();
const pokemonControl = require('../controller/controller');

router.get('/', pokemonControl.getAll);
router.get('/:id', pokemonControl.getSingle);
router.post('/', pokemonControl.createOne);
router.put('/:id', pokemonControl.updateOne);
router.put('/:id', pokemonControl.deleteOne);

module.exports = router;