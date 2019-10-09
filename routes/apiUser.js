var express = require('express');
var path = require('path');
var router = express.Router();

/* ### DB QUERIES ### */

// create a new user with their username and chosen password, returning nothing
function dbUserAdd(username, password) {
  console.log("adding new user to the database...");
  
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";

  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("finalproject");
    var myobj = { username: username, password: password };
    dbo.collection("users").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("added new user!");
      db.close();
    });
  });
}

// check if a username is taken, returning true if it is and false if not
let dbUserExists = function(arr) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(arr.length == 1) {
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true });
        try {
          MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) { 
            const db = client.db('finalproject');
            resolve(db.collection('users').find({username: arr[0]}).toArray())
            client.close();
          })
        }
        catch(e) {
          console.log(e)
        }
      }
      else {
        reject(Error("invalid!"))
      }
    }, 100)
  })
};

// check if the user both exists and matches the given password, returning true if valid and false if not
let dbUserAuthenticate = function(arr) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(arr.length == 2) {
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true });
        try {
          MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) { 
            const db = client.db('finalproject');
            resolve(db.collection('users').find({username: arr[0], password: arr[1]}).toArray())
            client.close();
          })
        }
        catch(e) {
          console.log(e)
        }
      }
      else {
        reject(Error("invalid!"))
      }
    }, 100)
  })
};

let dbUserGetAll = function() {
  console.log("getting all users...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true });
        try {
          MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
            const db = client.db('finalproject');
            resolve(db.collection('users').find({}).toArray())
            client.close();
          })
        }
        catch(e) {
          console.log(e)
        }
    }, 100)
  })
};

/* ### ROUTES ### */
router.post('/create', function (req, res) {
  console.log("attempting to create new account...");
  const username = req.body.username;
  const password = req.body.password;
  
  dbUserExists([username]).then(data => {
    if(data.length == 0) {
      console.log("username does not exist!!!");
      dbUserAdd(username, password);
      res.cookie('username', username);
      res.send("OK");
    }
    else {
      console.log("username exists!!!");
      res.send("BAD");
    }
  }).catch(e => {
    console.log(e)
  });
});

router.post('/login', function (req, res) {
  console.log("attempting to log in...");
  const username = req.body.username;
  const password = req.body.password;
  
  let loginInfo = [username, password];
  
  dbUserAuthenticate(loginInfo).then(data => {
    if(data.length != 0) {
      res.cookie('username', username);
      res.send("OK");
    }
    else {
      res.send("BAD");
    }
  }).catch(e => {
    console.log(e)
  })
});

router.post('/logout', function (req, res) {
  res.clearCookie('username');
  res.redirect("/");
});

router.post('/getUsers', function (req,res){
  console.log("getting all users...");
  dbUserGetAll().then(data => {
    res.send(data)
  }).catch(e => {
    console.log(e)
  })
});

module.exports = router;
