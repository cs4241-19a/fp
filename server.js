'use strict';

// express imports
const express = require('express');
const app = express();
// body parser imports
const bodyParser = require('body-parser');
// compression imports
const compression = require('compression');
// helmet imports
const helmet = require('helmet');
// favicon imports
const path = require('path');
const favicon = require('serve-favicon');
const fs = require('fs');

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

// provide favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Provide files from node_modules
app.use('/materialize', express.static(__dirname +
    '/node_modules/materialize-css/dist'));

app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.json({type: 'application/json'}));
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// port
const port = 3000;

app.listen(process.env.PORT || port);
