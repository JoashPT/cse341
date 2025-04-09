const router = require('express').Router();
const personaControl = require('../controller/personaController');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate');

router.get('/', personaControl.getAll);
router.get('/:id', personaControl.getSingle);
router.post('/', auth.isAuthenticated, validation.savePersona, personaControl.createOne);
router.put('/:id', auth.isAuthenticated, validation.savePersona, personaControl.updateOne);
router.delete('/:id', auth.isAuthenticated, personaControl.eraseOne);

module.exports = router;