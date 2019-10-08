var express = require('express');
var path = require('path');
var router = express.Router();

/* ### DB QUERIES ### */

// create a new user with their username and chosen password, returning nothing
function dbUserAdd(username, password) {
  //TODO
  return;
}

// check if a username is taken, returning true if it is and false if not
function dbUserExists(username) {
  //TODO
  return true;
}

// check if the user both exists and matches the given password, returning true if valid and false if not
function dbUserAuthenticate(username, password) {
  //TODO
  return true;
}

/* ### ROUTES ### */
router.post('/create', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!dbUserExists(username)) {
    dbUserAdd(username, password);
    res.cookie('username', username);
    res.redirect("/index?alert=Account+created");
  } else {
    res.redirect("/?alert=Username+taken");
  }
  res.end()
})

router.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (dbUserAuthenticate(username, password)) {
    res.cookie('username', username);
    res.redirect("/index");
  } else {
    res.redirect("/?alert=Invalid+login");
  }
})

router.post('/logout', function (req, res) {

  res.clearCookie('username')
  res.redirect("/");
})

module.exports = router;
