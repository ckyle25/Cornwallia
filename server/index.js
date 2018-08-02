const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');


const app = express();

app.use( bodyParser.json() );

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://ckylegaming.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: '{YOUR_API_IDENTIFIER}',
    issuer: `https://ckylegaming.auth0.com/`,
    algorithms: ['RS256']
  });
  


const port = 3000;
app.listen( port, () => { console.log(`Listening on Port ${port}`)});
