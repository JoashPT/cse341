const router = require('express').Router();

const contactControl = require('../controllers/controllers');
const validation = require('../middleware/validate');

router.get('/', contactControl.getAll);
router.get('/:id', contactControl.getSingle);
router.post('/', validation.saveContact, contactControl.createContact);
router.put('/:id', validation.saveContact, contactControl.updateContact);
router.delete('/:id', contactControl.deleteContact);

module.exports = router;