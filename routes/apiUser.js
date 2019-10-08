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
  return;
}

// check if a username is taken, returning true if it is and false if not
function dbUserExists(username) {
  console.log("checking if username exists...")
  
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  try {      
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) { 
      // assert.equal(null, err);
       const db = client.db('finalproject');
      
       var promise = () => {
         return new Promise((resolve, reject) => {
            db.collection('users').find({username: username}).toArray(function(err, data) {
                 err ? reject(err) : resolve(data);
               });
         });
       };  
      var callPromise = async () => {
          var result = await (promise());
          console.log(result)
          if(result.length != 0) {
            console.log("user exists, returning true")
            return true
          }
          else {
            console.log("user does not exist, returning false")
            return false
          }
       };      
      callPromise().then(function(result) {          
          client.close();
       });    
    }); //end mongo client   
   } 
  catch (e) {
     console.log(e)
   }
  return true;
}

// check if the user both exists and matches the given password, returning true if valid and false if not
function dbUserAuthenticate(username, password) {
  console.log("username: " + username)
  console.log("password: " + password)
  console.log("authenticating user...")
  
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  try {      
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) { 
       const db = client.db('finalproject');
       var promise = () => {
         return new Promise((resolve, reject) => {
            db.collection('users').find({username: username, password: password}).toArray(function(err, data) {
                 err ? reject(err) : resolve('data');
               });
         });
       };
      var callPromise = async () => {
          var result = await (promise());
          console.log(result)
          if(result.length != 0) {
            console.log("username and password match! logged in successfully!")
            return true
          }
          else {
            console.log("username or password do not match. could not log in!")
            return false
          }
       };      
      callPromise().then(function(result) {          
          client.close();
       });
    }); //end mongo client   
   } 
  catch (e) {
     console.log(e)
   }
}

// console.log("testing authenticate: " + dbUserAuthenticate("admin", "admin"))

/* ### ROUTES ### */
router.post('/create', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!dbUserExists(username)) {
    dbUserAdd(username, password);
    res.cookie('username', username);
    res.send("OK")
   // res.redirect("/index?alert=Account+created");
  } else {
    res.send("BAD")
   // res.redirect("/?alert=Username+taken");
  }
})

router.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  
  var loginSuccess = false

  dbUserAuthenticate(username, password).then(function(value) {
    console.log("this is the value: " + value);
  });
  
  if (loginSuccess) {
    res.cookie('username', username);
    res.send("OK")
  } else {
    res.send("BAD")
  }
})

router.post('/logout', function (req, res) {

  res.clearCookie('username')
  res.redirect("/");
})

module.exports = router;
