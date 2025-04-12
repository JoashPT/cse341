const router = require('express').Router();
//const passport = require('passport');

router.get('/', (req, res) => {res.send("\"/classical\" to see classical music database.")})
router.use('/', require('./swagger'));
router.use('/classical', require('./classical'));
router.use('/contemporary', require('./contemporary'));

// router.get('/login', passport.authenticate('github'), (req, res) => {});

// router.get('/logout', (req, res, next) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }
//         res.redirect('/');
//     })
// });

module.exports = router;