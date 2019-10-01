const express = require('express'),
      app = express(),
      Rawger = require('rawger'),
      port = 3000

let owned = null;
async function getAccount(){
	const rawger = await Rawger();
	const { users } = rawger;
	owned = (await users('ThisIsATest').games('owned')).raw();
	console.log(owned)
	}
getAccount()

app.get('/', function (req, res) {
  res.sendFile('/views/index.html', { root: '.' })
})
app.get('/requests', function (req, res) {
  res.sendFile('/views/requests.html', { root: '.' })
})
app.get('/games', function (req, res) {
  res.sendFile('/views/games.html', { root: '.' })
})
app.get('/catalog', function (req, res) {
  res.sendFile('/views/catalog.html', { root: '.' })
})

app.get('/getgames', function (req, res) {
  res.send(owned);
})

app.get('/gamedata',  function(req, res) {
  console.log("You Got The Game: " + res.game)
	res.send()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

