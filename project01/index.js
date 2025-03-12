const router = require('express').Router();

router.use('/contacts', require('./contact'));

module.exports = router;