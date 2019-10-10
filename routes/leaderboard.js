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
    var count = app.database.get('idCount').value()
    var users = app.database.get('users')
    var highscores = []
    for (var i = 1; i <= count; i++) {
        var current = users.find({id:i})
        highscores.push(current.get('highscore').value())
    }
    console.log(highscores)

    res.json(highscores);
  });





module.exports = router;