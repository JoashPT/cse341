const router = require('express').Router();
const passport = require('passport');

//router.get('/', (req, res) => {res.send("\"/pokemon\" to see pokemon database and \"/persona\" to see persona database")})
router.use('/', require('./swagger'));
router.use('/pokemon', require('./pokemon'));
router.use('/persona', require('./persona'));

router.get('/login', passport.authenticate('google'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
});

module.exports = router;