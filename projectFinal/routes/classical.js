const router = require('express').Router();
const classicalControl = require('../controller/classicalController');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', classicalControl.getAll);
router.get('/:id', classicalControl.getSingle);
router.get('/period/:period', classicalControl.getPeriod);
router.post('/', isAuthenticated, validation.saveClassical, classicalControl.createOne);
router.put('/:id', isAuthenticated, validation.saveClassical, classicalControl.updateOne);
router.delete('/:id', isAuthenticated, classicalControl.eraseOne);

module.exports = router;