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
const database   = require("./database.js")

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

passport.use(new Local(function(username, password, done)
{
	console.log("Attempted login: ", username)
	
	database.getUser(username).then(
	function(user)
	{
		if (user === null)
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
		
		database.getUser(req.body.username).then(
		function(user)
		{
			console.log(user)
			// Make sure user does not already exist
			if (user !== null)
			{
				console.log("Error: username ", req.body.username, " already exists")
				res.status(403) 	// Forbidden
				res.send()
				return
			}
			
			pass.hash(req.body.password).then(function(result)
			{
				database.createUser(req.body.username, result.salt, result.hash)
				console.log("Successfully created user ", req.body.username)
				res.json({"status": "success"})
			})
		})
	}
)

passport.serializeUser((user, done) =>
{
	console.log("Serialized user ", user.username)
	done(null, user.username)
})
passport.deserializeUser((username, done) =>
{
	console.log("Deserialized user ", username)
	
	database.getUser(username).then(
	function(user)
	{
		if (user === null)
		{
			done(null, false, {"message": "user not found - session not restored"})
		}
		else
		{
			done(null, user)
		}
	})
})


// ###########
// ## TASKS ##
// ###########

app.post(
	"/gettasks",
	function(req, res)
	{
		if (req.user === undefined)
		{
			res.status(401) // Unauthorized
			res.send()
			return
		}
		
		console.log(req.user.username)
		
		database.getUserTasks(req.user.username).then(
		function(tasks)
		{
			tasks = tasks === undefined ? {} : tasks
			console.log(tasks)
			res.json(tasks)
		})
	}
)

app.post(
	"/createtask",
	function(req, res)
	{
		if (req.user === undefined)
		{
			res.status(401) // Unauthorized
			res.send()
			return
		}
		
		database.getUser(req.user.username).then(
		function(user)
		{
			const task = req.body 	// Is this right???
			task.userId = user.id
			
			database.createTask(task)
			
			res.status(200)
			res.send()
		})
	}
)

app.post(
	"/edittask",
	function(req, res)
	{
		if (res.user === undefined)
		{
			res.status(401) // Unauthorized
			res.send()
			return
		}
		
		const task = req.body 	// Is this right???
		const taskId = task.id
		task.id = undefined 	// Don't update the task id to be the same that it already is
		
		database.updateTask(taskId, task).then(
		function()
		{
			res.status(200)
			res.send()
		})
	}
)

// Not yet implemented in the database library
/*
app.post(
	"/deletetask",
	function(req, res)
	{
		if (res.user === undefined)
		{
			res.status(401) // Unauthorized
			res.send()
			return
		}
		
		// TODO delete task in DB, maybe authenticate stuff?
		res.status(200)
		res.send()
	}
)
*/


// ############
// ## LISTEN ##
// ############

database.startDB().then(() =>
{
	const listener = app.listen(process.env.PORT || 3000, function()
	{
		console.log("Your app is listening on port " + listener.address().port)
	})
})
