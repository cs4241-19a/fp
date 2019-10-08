var express = require('express');
var path = require('path');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.sendFile('/public/pages/index.html', {root: path.dirname(__dirname)});
});

module.exports = router;
