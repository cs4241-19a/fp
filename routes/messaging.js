var express = require('express');
var path = require('path');
var router = express.Router();

/* GET messaging page. */
router.get('/', function(req, res, next) {
  res.sendFile('/public/pages/messaging.html', {root: path.dirname(__dirname)});
});

module.exports = router;
