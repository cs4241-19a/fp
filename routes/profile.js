var express = require('express');
var router = express.Router();
var app = require("../app")

router.get('/', function(req, res, next) {
  res.render('profile', {user: app.theUser.username});
});

module.exports = router;
