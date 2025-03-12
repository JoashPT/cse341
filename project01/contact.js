const router = require('express').Router();

const contactControl = require('./controllers');

router.get('/', contactControl.getAll);
router.get('/:id', contactControl.getSingle);

module.exports = router;