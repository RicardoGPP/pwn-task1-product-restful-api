//Imports required dependencies.
const express = require('express');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
const products = require('./routes/products.js');

//Sets the domain.
const domain = 'ricardows.vps.webdock.cloud';

//Creates SSL configuration.
const options = {
    key: fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`),
    cert: fs.readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`)
};

//Creates an express server.
const app = express();

//Sets conversion middlewares.
app.use(express.json());

//Sets logging middleware.
app.use(morgan('common'));

//Sets products resource/router middleware.
app.use('/produtos', products);

//Sets default 404 middleware.
app.use((_, res) => {
    res.status(404).send('<h2>404 - Resource not found.</h2>');
});

//Puts server up.
https.createServer(options, app).listen(8000);