const express = require('express');
const app = express();
const passport = require('passport');
const path = require('path');
const googleRoutes = require('./routes/google');
const port = process.env.PORT || 5000;

app.get('/api', (req, res) => {
    res.send('API Home Page');
});

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const expressSession = require('express-session');

passport.use(
    new GoogleStrategy(
        {
            clientID:
                '651787270824-o51k7n3t3dsjtvet9qo67jruu5n4c132.apps.googleusercontent.com',
            clientSecret: 'hZKU8dPFcQdIFyY28fpOz5_V',
            callbackURL: '/google',
        },
        (accessToken, refreshToken, profile, callback) => {
            callback(null, profile);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: '222926386362423',
            clientSecret: '0417ff8ada8724f5fc6f718ffeaec57a',
            callbackURL: '/facebook',
        },
        (accessToken, refreshToken, profile, callback) => {
            callback(null, profile);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(
    expressSession({
        secret: 'abc',
        resave: true,
        saveUninitialized: true,
    })
);

//Configure Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', googleRoutes);

app.use(express.static(path.join(__dirname, './build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build'));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
