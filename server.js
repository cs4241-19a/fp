/*
 * CS 4241 Final Project - Server code
 * by Terry Hearst, Demi Karavoussianis, Kyle Reese, and Tom White
 */


// ####################
// ## INITIALIZE APP ##
// ####################

const express    = require("express")
const app        = express()
const session    = require("express-session")
const passport   = require("passport")
const Local      = require("passport-local").Strategy
const pass       = require("pwd")
const bodyParser = require("body-parser")

// Parse JSON bodies
app.use(bodyParser.json())

// Serve our compiled react program
app.use(express.static("dist"))

// Redirect to the default webpage
app.get("/", function(request, response)
{
	response.sendFile(__dirname + "/dist/index.html")
})


// ####################
// ## AUTHENTICATION ##
// ####################

/* TEMP STUFF */
let users = []
const findUser = function(username)
{
	return users.find(user => user.username == username)
}
/* END TEMP STUFF */

passport.use(new Local(function(username, password, done)
{
	const user = findUser(username) // TODO use actual function
	
	console.log("Attempted login: ", username)
	
	if (user === undefined)
	{
		console.log("Fail - user not found")
		return done(null, false)
	}
	
	pass.hash(password, user.salt).then(function(result)
	{
		if (user.hash === result.hash)
		{
			console.log("Success")
			done(null, {"username": username, "password": password})
		}
		else
		{
			console.log("Fail - bad password")
			done(null, false)
		}
	})
}))

app.use(session({"secret": "top 5 bruh moments", "resave": false, "saveUninitialized": false}))
app.use(passport.initialize())
app.use(passport.session())

app.post(
	"/login",
	passport.authenticate("local"),
	function(req, res)
	{
		res.send()
	}
)

app.post(
	"/signup",
	function(req, res)
	{
		console.log("Signup request: ", req.body.username)
		
		if (req.body.username === undefined || req.body.password === undefined
			|| req.body.username === "" || req.body.password === "")
		{
			console.log("Error: not all fields are filled")
			res.status(400) 	// Bad request
			res.send()
			return
		}
		
		// Make sure user does not already exist
		if (findUser(req.body.username) !== undefined)
		{
			console.log("Error: username ", req.body.username, " already exists")
			res.status(403) 	// Forbidden
			res.send()
			return
		}
		
		pass.hash(req.body.password).then(function(result)
		{
			users.push({"username": req.body.username, "hash": result.hash, "salt": result.salt})
			console.log("Successfully created user ", req.body.username)
			res.json({"status": "success"})
		})
	}
)

passport.serializeUser((user, done) =>
{
	console.log("Serialized user ", user.username)
	done(null, user)
})
passport.deserializeUser((user, done) =>
{
	console.log("Deserialized user ", user.username)
	done(null, user)
})


// ############
// ## LISTEN ##
// ############

const listener = app.listen(process.env.PORT || 3000, function()
{
	console.log("Your app is listening on port " + listener.address().port)
})
