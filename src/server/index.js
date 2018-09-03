if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , session = require('express-session')
    , cors = require('cors')
    , sql = require('mssql');
const { getConfig } = require('./controllers/configController');

const app = express();

const publicweb = process.env.PUBLICWEB || './publicweb';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(publicweb))

passport.use(new Auth0Strategy(
  {
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
));

app.use( bodyParser.json() );
app.use( cors() );

const baseUrl = '/api';

//Auth Endpoints
app.get('/auth', passport.authenticate('auth0'));
app.get('/callback', passport.authenticate('auth0', {
  successRedirect: `${process.env.FRONTEND_URL}#/home`,
  failureRedirect: `${process.env.FRONTEND_URL}#`
}))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/me', (req, res, next) => {
  if (Object.keys(req.sessionStore.sessions).length === 0 && req.sessionStore.sessions.constructor === Object) {
    return res.status(401).send('Login Required');
  } else {
    return res.status(200).send(req.sessionStore.sessions);
  }
})

app.get('/auth/logout', (req, res) => {
  req.logOut();
  return res.redirect(`${process.env.FRONTEND_URL}/`);
})

// API Endpoints
app.get(`${baseUrl}/authConfig`, getConfig);

const port = process.env.PORT || 3001
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
