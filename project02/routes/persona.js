const router = require('express').Router();
const personaControl = require('../controller/personaController');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', personaControl.getAll);
router.get('/:id', personaControl.getSingle);
router.post('/', isAuthenticated, validation.savePersona, personaControl.createOne);
router.put('/:id', isAuthenticated, validation.savePersona, personaControl.updateOne);
router.delete('/:id', isAuthenticated, personaControl.eraseOne);

module.exports = router;