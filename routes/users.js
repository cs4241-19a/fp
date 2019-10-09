var express = require('express');
var router = express.Router();
const low = require('lowdb');
var app = require('../app');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/userData.json');
//const leaderboard = new FileSync('data/leaderboard.json');

const database = low(adapter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  var userData = database.get(app.user.username);
  res.json(userData);
});

module.exports = router;
