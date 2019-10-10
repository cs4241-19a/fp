//const router = require("./users.js");
const express = require("express");
const app = express();
const passport = require("passport");
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local').Strategy;
const shortid = require('shortid')
// Load User model
const User = require('./user');
const Question = require('./question');
const { forwardAuthenticated } = require('./auth');

const port = 3000,
  mongoose = require("mongoose"),
  url = "mongodb+srv://repimentel:Qhb50fko1Ebn2ZAk@cluster0-kkory.mongodb.net/test?retryWrites=true&w=majority";
  //require('./passport')(passport);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected");
  })
  .catch(err => {
    console.log("ERROR: ", err.message);
  });

app.use(express.static("public"));
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())

const myLocalStrategy = function (email, password, done) {
    console.log("In local strategy")
    // Match user
    User.findOne({
      email: email
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'That email is not registered' });
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          console.log("Its a match")
          return done(null, user);
        } else {
          console.log("password incorrect")
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    });
  
}
passport.use(new LocalStrategy(myLocalStrategy))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/register", function(request, response) {
  response.sendFile(__dirname + "/views/register.html");
});

app.post("/createUser", function(req, res) {
  console.log("POST /createUser")
  console.log(req.body)
  console.log(req.body.username)
  const { username, email, password } = req.body;
  let errors = [];

  if (!username || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    let errorMessage = JSON.stringify(errors)
    res.writeHead(403, "Forbidden", {'Content-Type': 'text/plain' })
    res.end(errorMessage)
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' })
        //res.render('register', {
        //  errors,
        //  username,
        //  email,
        //  password
        //})
      } else {
        const newUser = new User({
          username,
          email,
          password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.writeHead(201, "Created", {'Content-Type': 'text/plain' })
                res.write("Success!")
                res.end('Registration successful');

              })
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
})


// Login for joining room
app.post('/joinRoom', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/teacher',
    failureRedirect: '/'
  })(req, res, next);
});

//Login for creating room
app.post('/createRoom', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/teacher',
    failureRedirect: '/',
    //failureFlash: true
  })(req, res, next);
});

app.post('/makeId', (req, res, next) => {
  res.writeHead(201, 'OK', {'Content-Type': 'text/plain' })  //Write a reponse back to client
  res.write("A"+shortid.generate())
  res.end()
})

app.post("/saveQuestion", (req, res, next) =>{
  console.log(req.body)
  var newQuestion = new Question({
    quid: req.body.quid,
    username: req.body.username,
    question: req.body.question,
    upvote: 0,
    code: req.body.code
  })
  newQuestion.save(function (err, Question) {
    if (err) {
      res.writeHead(400, 'derp', {'Content-Type': 'text/plain' })  //Write a reponse back to client
      res.write("Question not saved")
      res.end()
    }
    else{
      res.writeHead(201, 'OK', {'Content-Type': 'text/plain' })  //Write a reponse back to client
      res.write("Question saved")
      res.end()
    }
  })
})

app.post("/loadQuestions", (req, res, next) => {
  
  Question.find({ 'code': req.body.code }, 'quid question upvote', function (err, Questions) {
    if (err) console.log('error')
    // 'Questions' contains the list of questions that match the criteria.
    // console.log("I am in load Question: ", Questions)
    // Send array of questions
    res.writeHead(201, 'OK', {'Content-Type': 'text/plain' })  //Write a reponse back to client
    res.write(JSON.stringify(Questions))
    res.end()
  })
})


app.post("/modifyUpvote", (req, res, next) =>{
  
  console.log("modifyUpvote")
  console.log(req.body.quid)
  //let qtest = Question.find( {"quid":req.body.quid} ).schema.obj
  //console.log(qtest)
  Question.findOneAndUpdate({ quid: req.body.quid }, { $inc: { upvote: 1 } }, {new: true },function(err, response) {
     if (err) {
       console.log(err);
      } else {
       console.log(response);
      }
      /*Question.update( 
        {"quid":req.body.quid},
        {"upvote": parseInt(req.body.num)})
       */ 
      res.writeHead(201, 'OK', {'Content-Type': 'text/plain' })  //Write a reponse back to client
      res.end()
  })
})


app.post("/deleteQuestion", (req, res, next) =>{
  console.log(req.body.id)
  Question.remove({ quid: req.body.id }, function(err) {
    if (!err) {
            console.log("removed");
    }
    else {
            console.log("error deleting");
    }
});
  //Delete question from database
  
  res.writeHead(201, 'OK', {'Content-Type': 'text/plain' })  //Write a reponse back to client
  res.end()
})

//Logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


// Testing
app.get("/teacher", function(request, response) {
  response.sendFile(__dirname + "/views/teacherView.html");
});
app.get("/student", function(request, response) {
  console.log("In student")
  response.sendFile(__dirname + "/views/studentView.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
