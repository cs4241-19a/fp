var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/public/pages/home.html', {root: path.dirname(__dirname)});
});
router.get('/javascripts/login.js', function(req, res, next) {
  res.sendFile('/javascripts/login.js', {root: path.dirname(__dirname)});
});



module.exports = router;
