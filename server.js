const express = require('express'),
      app = express(),
      Rawger = require('rawger'),
      port = 3000,
      bodyParser = require('body-parser'),
      url = require('url'),
      asyncHandler = require('express-async-handler')


      
let owned = null;
let search = null;
async function getAccount(){
	const rawger = await Rawger();
	const {users} = rawger;
  owned = (await users('WPI-GDC').games('owned')).raw();
  games = await (await users('WPI-GDC').games('owned')).next();
  while(typeof games !== 'undefined'){
    owned = owned.concat(games.get());
    games = await games.next()
    console.log("AMOUNT IN LIST IS: ",owned.length)
  }
  console.log("AMOUNT OF GAMES IS: " + (await users('WPI-GDC').games('owned')).count())
  console.log("AMOUNT IN LIST IS: ",owned.length)
	//console.log(owned)
  }

async function gameSearch(searchTerm){
  const {games} = await Rawger();
  gameGot = (await games.search(searchTerm)).get()
  return await Promise.resolve(gameGot);
}

async function gameGet(gameName){
  const {games} = await Rawger();
  gameGot = (await games.get(gameName)).get()
  return await Promise.resolve(gameGot);
}

getAccount()

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile('/views/index.html', { root: '.' })
})
app.get('/requests', function (req, res) {
  res.sendFile('/views/requests.html', { root: '.' })
})
app.get('/games', function (req, res) {
  res.sendFile('/views/games.html', { root: '.' })
})
app.get('/catalogue', function (req, res) {
  res.sendFile('/views/catalogue.html', { root: '.' })
})

app.get('/getgames', function (req, res) {
  res.send(owned);
})

app.get('/gameinfo', function(req, res){
  res.sendFile('/views/catalog.html', { root: '.' })
})

app.get('/gamesearch', function(req,res){
  res.send(gameSearch(req.games))
})

app.get('/gameselect', asyncHandler(async (req, res, next) => {
  let gameName = req.query['game']
  console.log("You Got The Game: " + gameName)
  gameGet(gameName).then(result => {
    res.send(result)
  })
}))

app.get('/havegame', function(req,res){
  var found = owned.filter(function(item) { return item.slug == req.query['game']; });
     console.log(found === undefined || found.length == 0)
     res.send(found === undefined || found.length == 0)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))