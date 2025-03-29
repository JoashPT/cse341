const router = require('express').Router();

router.get('/', (req, res) => {res.send("\"/pokemon\" to see pokemon database")})
router.use('/', require('./swagger'));
router.use('/pokemon', require('./pokemon'));

module.exports = router;