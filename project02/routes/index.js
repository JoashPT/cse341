const router = require('express').Router();

router.get('/', (req, res) => {res.send("\"/pokemon\" to see pokemon database")})
router.use('/pokemon', require('./pokemon'));

module.exports = router;