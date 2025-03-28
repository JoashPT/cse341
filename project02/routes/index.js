const router = require('express').Router();

router.get('/', (req, res) => {res.send("\"/pokemon\" to see pokemon database")})
router.use('/pokemon', require('./pokemon'));
router.use('/', require('./swagger'));

module.exports = router;