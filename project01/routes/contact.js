const router = require('express').Router();

const contactControl = require('../controllers/controllers');

router.get('/', contactControl.getAll);
router.get('/:id', contactControl.getSingle);
router.post('/', contactControl.createContact);
router.put('/:id', contactControl.updateContact);
router.delete('/:id', contactControl.deleteContact);

module.exports = router;