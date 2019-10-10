var express = require('express');
var path = require('path');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";

/* GET messaging page. */
router.get('/', function(req, res, next) {
    res.sendFile('/public/pages/cleardb.html', {root: path.dirname(__dirname)});
});

module.exports = router;