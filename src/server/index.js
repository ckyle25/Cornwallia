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
const isAuthenticated = require('./middleware/isAuthenticated');

const app = express();

const publicweb = process.env.PUBLICWEB || './publicweb';

app.use( bodyParser.json() );
app.use( cors() );
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(publicweb))

passport.use(new Auth0Strategy(
  {
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK_URL || 'http://localhost:3000/callback',
    scope: "openid email profile"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
  //   const info = {
  //     "profile": profile,
  //     "accessToken": accessToken,
  //     "refreshToken": refreshToken,
  //     "extraParams": extraParams
  // };
   //console.log('Profile', profile)
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  //console.log('serialize user', user)
  done(null, user);
});

passport.deserializeUser(function(user_id, done) {
  console.log('deserialize user', user_id)
  done(null, user_id);
});

const baseUrl = '/api';

//Auth Endpoints
app.get('/auth', passport.authenticate('auth0'));
app.get('/callback', passport.authenticate('auth0', {
  successRedirect: `${process.env.FRONTEND_URL}#/home`,
  failureRedirect: `${process.env.FRONTEND_URL}#`
}))



app.get('/auth/me', (req, res, next) => {
  // if (Object.keys(req.sessionStore.sessions).length === 0 && req.sessionStore.sessions.constructor === Object) {
  //   return res.status(401).send('Login Required');
  // } else {
  //   //console.log('user', req);
  //   // console.log('body', req.body);
  //   return res.status(200).send(req.sessionStore.sessions);
  // }
    // console.log("auth/me")
    // console.log('isAuthenticated', req.isAuthenticated())
    // console.log('req', req)
    // console.log('req.sessionStore.sessions', req.sessionStore.sessions)
    const sessions = req.sessionStore.sessions;
    console.log('sessions', sessions)
    const cookie = sessions[Object.keys(sessions)[0]]
    console.log('cookie', cookie)
  if (cookie) {
    const check2 = JSON.parse(cookie)
    console.log('1')
    console.log('check2', check2)
    if (check2.hasOwnProperty('passport')) {
      console.log('2')
      const newCookie = check2
      const user = newCookie.passport.user;
      return res.status(200).send(user);
    }
    //   console.log("authenticated")
  } else {
    //   console.log("not authenticated")
    return res.status(200).send("Login Required");
  }
});

app.get('/auth/logout', (req, res) => {
  req.session.destroy();
  req.logOut();
  return res.redirect(`${process.env.FRONTEND_URL}/`);
})

// API Endpoints
app.get(`${baseUrl}/authConfig`, getConfig);

const port = process.env.PORT || 3001
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
