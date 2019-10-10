var express = require('express');
var router = express.Router();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('data/userData.json');
var app = require('../app');

router.get('/', function(req, res, next) {
    if (app.database == undefined) {
        app.database = low(adapter);
    }
    res.json(app.database.get('users'));
  });

module.exports = router;