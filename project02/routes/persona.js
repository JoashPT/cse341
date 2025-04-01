const router = require('express').Router();
const personaControl = require('../controller/personaController');
const validation = require('../middleware/validate');

router.get('/', personaControl.getAll);
router.get('/:id', personaControl.getSingle);
router.post('/', validation.savePersona, personaControl.createOne);
router.put('/:id', validation.savePersona, personaControl.updateOne);
router.delete('/:id', personaControl.eraseOne);

module.exports = router;