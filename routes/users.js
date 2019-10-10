var express = require('express');
var router = express.Router();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('data/userData.json');
var app = require('../app');

router.post('/create', function (req, res, next) {
  if (app.database == undefined) {
    app.database = low(adapter);
  }
  var newUser = req.body;
  var condition = 0;
  console.log("help me")
  if (app.database.get("users").find({"username":newUser.username}).value() != undefined) {
    console.log("repeat user")
    condition = 1;
  }
  else {
    var count = app.database.get("idCount").value();
    newUser.id = count+1;
    newUser.highscore = 0;
    newUser.games = [];
    app.database.set('idCount', count+1)
    .write();
    app.database.get("users")
    .push(newUser)
    .write();
  }
  res.json({"condition": condition})
  });

module.exports = router;
