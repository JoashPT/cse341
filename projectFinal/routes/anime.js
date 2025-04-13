const router = require('express').Router();
const animeControl = require('../controller/animeController');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', animeControl.getAll);
router.get('/:id', animeControl.getSingle);
router.get('/anime/:anime', animeControl.getAnime);
router.get('/band/:band', animeControl.getBand);
router.post('/', isAuthenticated, validation.saveAnime, animeControl.createOne);
router.put('/:id', isAuthenticated, validation.saveAnime, animeControl.updateOne);
router.delete('/:id', isAuthenticated, animeControl.eraseOne);

module.exports = router;