const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/classical', require('./classical'));
router.use('/contemporary', require('./contemporary'));
router.use('/anime', require('./anime'));
router.use('/videogame', require('./videogame'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
});

module.exports = router;