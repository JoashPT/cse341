const router = require('express').Router();

router.get('/', (req, res) => {res.send("contacts to see database, api-docs to use swagger")})
router.use('/', require('./swagger'));
router.use('/contacts', require('./contact'));

module.exports = router;