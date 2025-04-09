const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const GitHubStrategy = require('passport-github2').Strategy;
//const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        // cookie: { 
        //     secure: true,
        //     maxAge: 86400000 },
        // store: new MemoryStore({
        //     checkPeriod: 86400000
        // }),
        secret: "secret",
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors({methods: ['GET, POST , PUT, DELETE, PATCH, UPDATE']}))
    .use(cors({origin: '*'}))
    .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}\n`)
})


// *** Using GitHub strategy ***
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

// *** Using  Google Strategy ***
// passport.use(new GoogleStrategy({
//     clientID:     process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL,
//     passReqToCallback   : true
//   },
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return done(err, user);
//   }))
// );

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged Out")});

// *** Github redirect ***
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/pokeapi-docs', session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

// *** Google Redirect ***
// app.get( 'google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/',
//         failureRedirect: '/'
// }));

mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {console.log(`Listening on port ${port}`)});
    }
})