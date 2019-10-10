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
  var count = app.database.get("idCount").value();
  newUser.id = count+1;
  app.database.set('idCount', count+1)
  .write();
  app.database.get("users")
  .push(newUser)
  .write();

  res.end()
  });

module.exports = router;
