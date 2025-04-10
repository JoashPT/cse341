const router = require('express').Router();
const contemporaryControl = require('../controller/contemporaryController');
const validation = require('../middleware/validate');
//const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', contemporaryControl.getAll);
router.get('/:id', contemporaryControl.getSingle);
router.get('/genre/:genre', contemporaryControl.getGenre);
router.post('/', validation.saveContemporary, contemporaryControl.createOne);
router.put('/:id', validation.saveContemporary, contemporaryControl.updateOne);
router.delete('/:id', contemporaryControl.eraseOne);

module.exports = router;