const router = require('express').Router();
const classicalControl = require('../controller/classicalController');
const validation = require('../middleware/validate');
//const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', classicalControl.getAll);
router.get('/:id', classicalControl.getSingle);
router.get('/period/:period', classicalControl.getPeriod);
router.post('/', validation.saveClassical, classicalControl.createOne);
router.put('/:id', validation.saveClassical, classicalControl.updateOne);
router.delete('/:id', classicalControl.eraseOne);

module.exports = router;