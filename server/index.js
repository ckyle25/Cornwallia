if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const { getConfig } = require('./controllers/configController');

const app = express();
app.use(express.static(__dirname + '/../public/dist'))
app.use( bodyParser.json() );
app.use( cors() );    

const baseUrl = '/api';

app.get(`${baseUrl}/authConfig`, getConfig);

const port = process.env.PORT || 3001
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );