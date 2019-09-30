const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const pouchdb = require('pouchdb');
pouchdb.plugin(require('pouchdb-upsert'));
const db = new pouchdb('my_db');

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

db.get('users').catch(function (err) {
    if (err.name === 'not_found') {
        return {
            _id: 'users',
            users: []
        };
    } else { // hm, some other error
        throw err;
    }
}).then(function (doc) {
    User = doc.users;
}).catch(err => {
    console.log(err);
});