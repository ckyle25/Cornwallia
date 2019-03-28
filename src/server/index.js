require('dotenv').config({path:__dirname+'/./../.env'});

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , session = require('express-session')
    , cors = require('cors')
    , massive = require('massive')
    , nodemailer = require('nodemailer')
    , schedule = require('node-schedule')
    , moment = require('moment')
const { getConfig } = require('./controllers/configController');
const { getUser, getAdmin, updateEdwUser, requestAccess, giveFeedback } = require('./controllers/sharedController');
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
        updateWishesUser,
        updateBio,
        getReserverEmail,
        checkEmailBirthdays,
        getAmazonWishes,
        emailReserver } = require('./controllers/wishesController')
const { foodGetActiveUser } = require('./controllers/foodController');
var AmazonWishList = require('./classes/amazonWishList');
const { checkAuthenticated } = require('./middleware/isAuthenticated');

const app = express();

massive(process.env.CONNECTION_STRING).then( db => {
  app.set('db', db);
})

const publicweb = process.env.PUBLICWEB || './publicweb';

app.use( bodyParser.json() );
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
      next();
  }
});
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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SERVICE_USERNAME,
    pass: process.env.EMAIL_SERVICE_PASSWORD
  }
});

 const awl = ''; //new AmazonWishList();

app.set('transporter', transporter);
app.set('awl', awl);

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
  if (!req.user) {
    return res.status(200).send('Login Required');
  } else {
    return res.status(200).send(req.user);
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
app.post(`${baseUrl}/shared/requestAccess`, checkAuthenticated, requestAccess);
app.post(`${baseUrl}/shared/giveFeedback`, checkAuthenticated, giveFeedback);
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
app.put(`${baseUrl}/wishes/updateBio`, checkAuthenticated, updateBio);
app.put(`${baseUrl}/wishes/updateUser`, checkAuthenticated, updateWishesUser);
app.put(`${baseUrl}/wishes/updateFamily`, checkAuthenticated, updateWishesFamily);
app.post(`${baseUrl}/wishes/getReserverEmail`, checkAuthenticated, getReserverEmail);
app.post(`${baseUrl}/wishes/emailReserver`, checkAuthenticated, emailReserver);
app.post(`${baseUrl}/wishes/getAmazonWishes`, checkAuthenticated, getAmazonWishes);

// Food API Endpoints
app.post(`${baseUrl}/food/getActiveUser`, checkAuthenticated, foodGetActiveUser);

// Wishes Email Services
// let j = schedule.scheduleJob('1 * * * * *', () => {
// let j = schedule.scheduleJob('20 * * *', () => {
//   app.get('db').check_birthdays()
//   .then(result => {
//       const today = moment(new Date());
//       let birthdayUpdateList = [];

//       result.forEach((user) => {
//         var birthDay = moment(user.birthdaydt).year(today.year());
//         var birthDayNextYear = moment(user.birthdaydt).year(today.year() + 1);
//         var daysRemainingThisYear = birthDay.diff(today, 'days');
//         var daysRemainingNextYear = birthDayNextYear.diff(today, 'days');

//         if (daysRemainingThisYear == 30 || daysRemainingNextYear == 30) {
//           birthdayUpdateList.push(user);
//         }

//         if (daysRemainingThisYear == 14 || daysRemainingNextYear == 14) {

//           let familyList = '';

//           switch (user.familyid) {
//             case 1:
//               familyList = '{1,2,3,4,5,6,7}';
//               break;
//             case 2:
//               familyList = '{1,2,3,4}';
//               break;
//             case 3:
//               familyList = '{1,2,3,4}';
//               break;
//             case 4:
//               familyList = '{1,2,3,4}';
//               break;
//             case 5:
//               familyList = '{1,5,6}';
//               break;
//             case 6:
//               familyList = '{1,5,6,7}';
//               break;
//             case 7:
//               familyList = '{1,6,7}';
//               break;
//           }

//         app.get('db').get_birthday_checkout([user.userid, familyList])
//           .then(result => {
//             result.forEach(user => {
//               const mailOptions = {
//                 from: 'Cornwallia Wishes <cornwallia225@gmail.com>',
//                 to: user.emaildsc,
//                 subject: `${user.birthdayperson}'s Birthday Reminder: Login to View Wishes`,
//                 text: `Hi ${user.firstnameval},\n\nIt looks like ${user.birthdayperson}'s birthday is coming on ${moment(user.birthdaydt).format("MMM DD")}. Login to the wishes app to view their updated wishes.\nLink: https://cornwallia.azurewebsites.net/\n\nRegards,\n\nCornwallia Wishes Admin`
//               };

//               transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                   console.log(error);
//                 } else {
//                   return res.status(200).send('Email sent')
//                 }
//               });
//             })
//           });
//         }

//       });

//       // const testEmailArray = [
//       //   {
//       //     userid: 12,
//       //     firstnameval: 'Kyle',
//       //     birthdaydt: '1964-01-08T07:00:00.000Z',
//       //     edwuserid: null,
//       //     primaryemail: 'ckyle25@gmail.com',
//       //     parent1name: 'Kyle',
//       //     parent1edwuserid: null,
//       //     parent1email: 'ckyle25@gmail.com',
//       //     parent2name: null,
//       //     parent2edwuserid: null,
//       //     parent2email: null
//       //   },
//       //   {
//       //     userid: 7,
//       //     firstnameval: 'Lily',
//       //     birthdaydt: '2000-01-30T07:00:00.000Z',
//       //     edwuserid: null,
//       //     primaryemail: null,
//       //     familyid: null,
//       //     parent1name: 'Kevin',
//       //     parent1edwuserid: 9,
//       //     parent1email: 'fflm.cornwall@gmail.com',
//       //     parent2name: 'Kendal',
//       //     parent2edwuserid: 8,
//       //     parent2email: 'kendollnorman@gmail.com'
//       //   }
//       // ]

//       birthdayUpdateList.forEach(user => {
//         let toAddress = ''

//         if (user.primaryemail) {
//           toAddress = user.primaryemail

//           const mailOptions = {
//             from: 'Cornwallia Wishes <cornwallia225@gmail.com>',
//             to: toAddress,
//             subject: 'Birthday Reminder: Update your Wishes in Cornwallia',
//             text: `Hi ${user.firstnameval},\n\nIt looks like your birthday is coming up soon. When you get a second, login to the Wishes app to update your wish list!\nLink: https://cornwallia.azurewebsites.net/\n\nRegards,\n\nCornwallia Wishes Admin`
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.log(error);
//             } else {
//               return res.status(200).send('Email sent')
//             }
//           });
//         }

//         if (!user.primaryemail && user.parent1email) {
//           toAddress = user.parent1email

//           const mailOptions = {
//             from: 'Cornwallia Wishes <cornwallia225@gmail.com>',
//             to: toAddress,
//             subject: `Birthday Reminder: Update ${user.firstnameval}'s Wishes in Cornwallia`,
//             text: `Hi ${user.parent1name},\n\nIt looks like ${user.firstnameval}'s birthday is coming up soon. When you get a second, login to the Wishes app to update their wish list!\nLink: https://cornwallia.azurewebsites.net/\n\nRegards,\n\nCornwallia Wishes Admin`
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.log(error);
//             } else {
//               return res.status(200).send('Email sent')
//             }
//           });
//         }

//         if (!user.primaryemail && user.parent2email) {
//           toAddress = user.parent2email

//           const mailOptions = {
//             from: 'Cornwallia Wishes <cornwallia225@gmail.com>',
//             to: toAddress,
//             subject: `Birthday Reminder: Update ${user.firstnameval}'s Wishes in Cornwallia`,
//             text: `Hi ${user.parent2name},\n\nIt looks like ${user.firstnameval}'s birthday is coming up soon. When you get a second, login to the Wishes app to update their wish list!\nLink: https://cornwallia.azurewebsites.net/\n\nRegards,\n\nCornwallia Wishes Admin`
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.log(error);
//             } else {
//               return res.status(200).send('Email sent')
//             }
//           });
//         }
//       });
//   });
// })

const port = process.env.PORT || 3001
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
