var express = require('express');
var path = require('path');
var router = express.Router();

/* GET search page. */
router.get('/', function(req, res, next) {
  res.sendFile('/public/pages/search.html', {root: path.dirname(__dirname)});
});

module.exports = router;
