const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');

let port = process.env.PORT || 3000;

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(compression());

app.use(express.static('public'));

app.get('/', function (request, response) {
    'use strict';
    response.sendFile(__dirname + '/views/index.html');
});

app.listen(port, function () {
    'use strict';
    console.log(`Example app listening on port !`);
});
