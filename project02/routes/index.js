const router = require('express').Router();

router.get('/', (req, res) => {res.send("\"/pokemon\" to see pokemon database and \"/persona\" to see persona database")})
router.use('/', require('./swagger'));
router.use('/pokemon', require('./pokemon'));
router.use('/persona', require('./persona'));

module.exports = router;