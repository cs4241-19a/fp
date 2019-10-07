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
  const rawger = await Rawger({
    email: 'gdc-systems@wpi.edu',
    password: 'rawgpassword'
  });
  const {users} = rawger;
  //console.log((await rawger.games.search()))
  owned = (await users('WPI-GDC').games('owned')).get();
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

async function gameSearch(search, genre, Console){
  const rawger = await Rawger();
  const {users} = rawger;
  searchTerm = search.toLowerCase()
  let searchFound = null;
  let filter = function(o){
    return o.name.toLowerCase().includes(searchTerm)
  }
  if(search == '' && genre !='' && Console==''){
    filter = function(o){
      genres = o.raw.genres
      for(i = 0; i < genres.length; i++)
        if(genres[i].name === (genre)){
          console.log("WHERE IN")
          return true
        }
      return false
    }
  }else if(search ==''&& genre==''&&Console!=''){
    filter = function(o){
      genres = o.raw.parent_platforms
      for(i = 0; i < genres.length; i++)
      if(genres[i].platform.name === Console && genres[i].selected == true){
        console.log("WHERE IN")
        return true
      }
    }
  }else if(search != '' && genre !='' && Console==''){
    filter = function(o){
      if(o.name.toLowerCase().includes(searchTerm) == false)
        return false
      let genreIn = false
      genres = o.raw.genres
      for(i = 0; i < genres.length; i++)
        if(genres[i].name === (genre)){
          console.log("WHERE IN")
          genreIn = true
          break;
        }
        return genreIn
    }
  }else if(search != '' && genre =='' && Console!=''){
    filter = function(o){
      if(o.name.toLowerCase().includes(searchTerm) == false)
        return false
      let genreIn = false
      genres = o.raw.parent_platforms
      for(i = 0; i < genres.length; i++)
        if(genres[i].platform.name === Console && genres[i].selected == true){
        console.log("WHERE IN")
        genreIn = true
        break
      }
        return genreIn
    }
  }else if(search == '' && genre !='' && Console!=''){
    filter = function(o){
      let genreIn = false
      let genreIn2 = false
      genres = o.raw.genres
      for(i = 0; i < genres.length; i++)
        if(genres[i].name === (genre)){
          console.log("WHERE IN")
          genreIn = true
          break;
        }
        genres = o.raw.parent_platforms
        for(i = 0; i < genres.length; i++)
          if(genres[i].platform.name === Console && genres[i].selected == true){
          console.log("WHERE IN")
          genreIn2 = true
          break
        }
        return genreIn && genreIn2
    }
  }else if(search != '' && genre !='' && Console!=''){
    filter = function(o){
      if(o.name.toLowerCase().includes(searchTerm) == false)
        return false
      let genreIn = false
      let genreIn2 = false
      genres = o.raw.genres
      for(i = 0; i < genres.length; i++)
        if(genres[i].name === (genre)){
          console.log("WHERE IN")
          genreIn = true
          break;
        }
        genres = o.raw.parent_platforms
        for(i = 0; i < genres.length; i++)
          if(genres[i].platform.name === Console && genres[i].selected == true){
          console.log("WHERE IN")
          genreIn2 = true
          break
        }
        return genreIn && genreIn2
    }
  }
  console.log(searchTerm)
  console.log(genre)
  console.log(Console)
  searchFound = (await users('WPI-GDC').games('owned')).filter(function(o){return filter(o)});
  games = await (await users('WPI-GDC').games('owned')).next();
  while(typeof games !== 'undefined'){
    searchFound = searchFound.concat(games.filter(function(o){return filter(o)}));
    games = await games.next()
    console.log("AMOUNT IN LIST IS: ",searchFound.length)
  }
  return await Promise.resolve(searchFound);
}

async function requestSearch(search, genre, Console){
  const Rawger = require('rawger');
const { games } = await Rawger({});
  searchTerm = search.toLowerCase()
  let searchFound = null;
  let filter = function(o){
    return o.name.toLowerCase().includes(searchTerm)
  }
  if(search == '' && genre !='' && Console==''){
    filter = function(o){
      genres = o.raw.genres
      for(i = 0; i < genres.length; i++)
        if(genres[i].name === (genre)){
          return true
        }
      return false
    }
  }else if(search ==''&& genre==''&&Console!=''){
    filter = function(o){
      genres = o.raw.parent_platforms
      for(i = 0; i < genres.length; i++)
      if(genres[i].platform.name === Console && genres[i].selected == true){
        console.log("WHERE IN")
        return true
      }
    }
  }else if(search != '' && genre !='' && Console==''){
    filter = function(o){
      if(o.name.toLowerCase().includes(searchTerm) == false)
        return false
      let genreIn = false
      genres = o.raw.genres
      for(i = 0; i < genres.length; i++)
        if(genres[i].name === (genre)){
          console.log("WHERE IN")
          genreIn = true
          break;
        }
        return genreIn
    }
  }else if(search != '' && genre =='' && Console!=''){
    filter = function(o){
      if(o.name.toLowerCase().includes(searchTerm) == false)
        return false
      let genreIn = false
      genres = o.raw.parent_platforms
      for(i = 0; i < genres.length; i++)
        if(genres[i].platform.name === Console && genres[i].selected == true){
        console.log("WHERE IN")
        genreIn = true
        break
      }
        return genreIn
    }
  }else if(search == '' && genre !='' && Console!=''){
    filter = function(o){
      let genreIn = false
      let genreIn2 = false
      genres = o.raw.genres
      for(i = 0; i < genres.length; i++)
        if(genres[i].name === (genre)){
          console.log("WHERE IN")
          genreIn = true
          break;
        }
        genres = o.raw.parent_platforms
        for(i = 0; i < genres.length; i++)
          if(genres[i].platform.name === Console && genres[i].selected == true){
          console.log("WHERE IN")
          genreIn2 = true
          break
        }
        return genreIn && genreIn2
    }
  }else if(search != '' && genre !='' && Console!=''){
    filter = function(o){
      if(o.name.toLowerCase().includes(searchTerm) == false)
        return false
      let genreIn = false
      let genreIn2 = false
      genres = o.raw.genres
      for(i = 0; i < genres.length; i++)
        if(genres[i].name === (genre)){
          console.log("WHERE IN")
          genreIn = true
          break;
        }
        genres = o.raw.parent_platforms
        for(i = 0; i < genres.length; i++)
          if(genres[i].platform.name === Console && genres[i].selected == true){
          console.log("WHERE IN")
          genreIn2 = true
          break
        }
        return genreIn && genreIn2
    }
  }
  try{
    gameList = await (await games.search(search));
  }
  catch{
    return await Promise.resolve([]);
  }
  searchFound = await gameList.filter(function(o){return filter(o)})
  try{
    gameList = await gameList.next()
  }
  catch{
    return await Promise.resolve(searchFound);
  }
  while(typeof gameList !== 'undefined'){
    searchFound = searchFound.concat(gameList.filter(function(o){return filter(o)}));
    try{
      gameList = await gameList.next()
    }
    catch{
      return await Promise.resolve(searchFound);
    }
    console.log("AMOUNT IN LIST IS: ",searchFound.length)
  }
  return await Promise.resolve(searchFound);
}

async function gameGet(gameName){
  const {games} = await Rawger();
  gameGot = (await games.get(gameName)).get()
  return await Promise.resolve(gameGot);
}

async function requestGame(gameID){
  const rawger = await Rawger({
    email: 'gdc-systems@wpi.edu',
    password: 'rawgpassword'
  });
  const {users} = rawger;
  console.log('requesting: '+gameID)
  await users('WPI-GDC').update().game(gameID, {status:'toplay'})
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
app.get('/request', function (req, res) {
  res.sendFile('/views/request.html', { root: '.' })
})
app.get('/games', function (req, res) {
  res.sendFile('/views/games.html', { root: '.' })
})
app.get('/catalog', function (req, res) {
  res.sendFile('/views/catalogue.html', { root: '.' })
})
app.get('/resources/gdcvectorscaledup.png',function (req, res){
  res.sendFile('/resources/gdcvectorscaledup.png', {root: '.'})
})
app.get('/resources/ARCADE.TTF',function (req, res) {
  res.sendFile('/resources/ARCADE.TTF', {root: '.'})
})
app.get('/getgames', function (req, res) {
  res.send(owned);
})

app.get('/gameinfo', function(req, res){
  res.sendFile('/views/catalog.html', { root: '.' })
})
app.get('/image.jpg', function (req, res) {
  res.sendFile('/resources/image.jpg', { root: '.' })
})
app.get('/new', function (req, res) {
  res.sendFile('/resources/ARCADE.TTF', { root: '.' })
})
app.get('/gamesearch', function(req,res){
  gameToSearch = req.query
  gameSearch(gameToSearch['gameName'], gameToSearch['genre'], gameToSearch['console']).then(result => {
    res.send(result)
  })
})
app.get('/requestsearch', function(req,res){
  gameToSearch = req.query
  requestSearch(gameToSearch['gameName'], gameToSearch['genre'], gameToSearch['console']).then(result => {
    res.send(result)
  })
})
app.get('/gameselect', asyncHandler(async (req, res, next) => {
  let gameName = req.query['game']
  var found = owned.filter(function(item) { return item.slug == req.query['game']; });
  if(found === undefined || found.length == 0)
  res.status(404).send('Not found');
  console.log("You Got The Game: " + gameName)
  gameGet(gameName).then(result => {
    res.send(result)
  })
}))

app.get('/requestgame',function(req,res){
  requestGame(req.query['gameId']).then(result => {
    res.send(result)
  })
})

app.get('/gamescreenshots', function(req,res){
  let gameName = req.query['game']
  let photos = null
  owned.forEach(element => {
    if(element.slug == gameName){
      console.log(gameName)
      photos = element.raw.short_screenshots
    }
  });
  res.send(photos)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))