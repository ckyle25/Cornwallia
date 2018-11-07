if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , session = require('express-session')
    , cors = require('cors')
    , massive = require('massive')
const { getConfig } = require('./controllers/configController');
const { getUser, getAdmin, updateEdwUser } = require('./controllers/sharedController');
const { getAllUsers,
        getActiveUser,
        getWishes,
        reserveWish,
        releaseWish,
        getFamilyReference,
        addWish,
        deleteWish,
        updateWish,
        getReservedWishes,
        updateWishesFamily,
        updateWishesUser } = require('./controllers/wishesController')
const { checkAuthenticated } = require('./middleware/isAuthenticated');

const app = express();

massive(process.env.CONNECTION_STRING).then( db => {
  app.set('db', db);
})

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
   const db = app.get('db');

   db.find_user([ profile.user_id ])
    .then( user => {
      if ( user[0] ) {
        return done( null, { id: user[0].userid } );
      } else {

        db.get_max_user_id()
          .then(maxID => {

            var newID = maxID[0].max + 1;
            var profileJson = profile._json

            if (profileJson.given_name) {
              var firstName = profileJson.given_name;
              var lastName = profileJson.family_name;
              var email = profileJson.email
              var newUserID = profile.user_id
            } else {
              var firstName = profileJson.nickname;
              var lastName = profileJson.nickname;
              var email = profileJson.email
              var newUserID = profile.user_id
            }

            db.create_user([newID, email, firstName, lastName, newUserID])
              .then( user => {
                return done( null, { id: user[0].userid } );
              });
          });
      };
  });
}));


passport.serializeUser(function(user, done) {
  //console.log('serialize user', user)
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  app.get('db').find_session_user([user.id])
  .then( user => {
    return done(null, user[0]);
  })
});

const baseUrl = '/api';

//Auth Endpoints
app.get('/auth', passport.authenticate('auth0'));
app.get('/callback', passport.authenticate('auth0', {
  successRedirect: `${process.env.FRONTEND_URL}/home`,
  failureRedirect: `${process.env.FRONTEND_URL}/login`
}))

app.get('/auth/me', (req, res, next) => {
    const sessions = req.sessionStore.sessions;
    let passport = {}

  for(let sessionID in sessions) {
    let sessionTest = JSON.parse(sessions[sessionID]);
    if (sessionTest.hasOwnProperty('passport')) {
      passport = sessionTest.passport
    }
  }

  if (Object.keys(passport).length === 0 && passport.constructor === Object) {
    return res.status(200).send("Login Required");
  } else {
    return res.status(200).send(passport.user)
  }
});

app.get('/auth/logout', (req, res) => {
  req.session.destroy();
  req.logOut();
  return res.redirect(`${process.env.FRONTEND_URL}/`);
})

// Shared API Endpoints
app.get(`${baseUrl}/authConfig`, getConfig);
app.get(`${baseUrl}/shared/getAdmin`, checkAuthenticated, getAdmin);
app.post(`${baseUrl}/shared/getuser`, checkAuthenticated, getUser);
app.put(`${baseUrl}/shared/updateUser`, checkAuthenticated, updateEdwUser);

// Wishes API Endpoints
app.get(`${baseUrl}/wishes/getAllUsers`, checkAuthenticated, getAllUsers);
app.get(`${baseUrl}/wishes/getFamilyReference`, checkAuthenticated, getFamilyReference);
app.post(`${baseUrl}/wishes/getActiveUser`, checkAuthenticated, getActiveUser);
app.post(`${baseUrl}/wishes/getWishes`, checkAuthenticated, getWishes);
app.post(`${baseUrl}/wishes/reserveWish`, checkAuthenticated, reserveWish);
app.post(`${baseUrl}/wishes/releaseWish`, checkAuthenticated, releaseWish);
app.post(`${baseUrl}/wishes/addWish`, checkAuthenticated, addWish);
app.post(`${baseUrl}/wishes/deleteWish`, checkAuthenticated, deleteWish);
app.put(`${baseUrl}/wishes/updateWish`, checkAuthenticated, updateWish);
app.post(`${baseUrl}/wishes/getReservedWishes`, checkAuthenticated, getReservedWishes);
app.post(`${baseUrl}/shared/getuser`, checkAuthenticated, getUser);
app.put(`${baseUrl}/wishes/updateUser`, checkAuthenticated, updateWishesUser);
app.put(`${baseUrl}/wishes/updateFamily`, checkAuthenticated, updateWishesFamily);

const port = process.env.PORT || 3001
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
