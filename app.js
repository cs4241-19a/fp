const firebaseConfig = {
  apiKey: "AIzaSyDi3Zz5XILnhu1qKvkQHbH_T8q2ulALkoI",
  authDomain: "workout-playlist.firebaseapp.com",
  databaseURL: "https://workout-playlist.firebaseio.com",
  projectId: "workout-playlist",
  storageBucket: "",
  messagingSenderId: "352840445466",
  appId: "1:352840445466:web:330c063a74af1b0de66ba3",
  measurementId: "G-2NTMVGJBFP"
};

firebase.initializeApp(firebaseConfig)

var songDB = firebase.database()

var client_id = '342df7663058425ba485361990a9b6be'
var client_secret = '5458b9f444ed421dae08d1f941e10191'
//var redirect_uri = 'REDIRECT_URI'
var pop, rock, country, hipHop, edm, rap, intensity
var countPlay
var artists=[], songs=[], times=[], uris=[]
var playArtists=[], playSongs=[], playURIs=[]

function createPlaylist(){
  countPlay=0
  artists=[], songs=[], times=[], uris=[], playArtists=[], playSongs=[], playURIs=[]
  removeTable()
  pop = document.getElementById("pop").checked
  rock = document.getElementById("rock").checked
  country = document.getElementById("country").checked
  edm = document.getElementById("edm").checked
  rap = document.getElementById("rap").checked
  intensity = document.getElementById("intensity").value
  if(pop){
    addPop()
  }
  if(rock){
    addRock()
  }
  if(country){
    addCountry()
  }
  if(edm){
    addEDM()
  }
  if(rap){
    addRap()
  }
  setTimeout(function(){
    songsToPlaylist()
}, 1500);
}

function addPop(){
  songDB.ref('Pop/'+ intensity).once('value', function(snapshot){
    snapshot.forEach(function(song) {
      addToArray(song.key, song.val().Artist, song.val().Time, song.val().URI)   
    })
  })
}

function addRock(){
  songDB.ref('Rock/'+ intensity).once('value', function(snapshot){
    snapshot.forEach(function(song) {
      addToArray(song.key, song.val().Artist, song.val().Time, song.val().URI)
    })
  })
}

function addCountry(){
  songDB.ref('Country/'+ intensity).once('value', function(snapshot){
    snapshot.forEach(function(song) {
      addToArray(song.key, song.val().Artist, song.val().Time, song.val().URI)
    })
  })
}


function addRap(){
  songDB.ref('Rap/'+ intensity).once('value', function(snapshot){
    snapshot.forEach(function(song) {
      addToArray(song.key, song.val().Artist, song.val().Time, song.val().URI)
    })
  })
}

function addEDM(){
  songDB.ref('EDM/'+ intensity).once('value', function(snapshot){
    snapshot.forEach(function(song) {
      addToArray(song.key, song.val().Artist, song.val().Time, song.val().URI)
    })
  })
}

function songsToPlaylist(){
  var playlistTime= 0
  var workoutTime= document.getElementById("time").value
  var i = songs.length
  while(playlistTime < (workoutTime*60) && playSongs.length < i){
    var random = Math.floor(Math.random()*songs.length)
    playSongs.push(songs[random])
    playArtists.push(artists[random])
    playURIs.push(uris[random])
    playlistTime +=  Number(times[random])
    songs.splice(random, 1)
    artists.splice(random, 1)
    uris.splice(random, 1)
    times.splice(random, 1)
  }
  addToTable()
}

function addToTable(){
  var rows= document.getElementById("playlistTable")
  for(var j=0; j<playSongs.length; j++){
    var newRow = rows.insertRow()
    var songName = newRow.insertCell(0) 
    var artistName = newRow.insertCell(1) 
    var URLName = newRow.insertCell(2)
    songName.innerHTML=playSongs[j]
    artistName.innerHTML=playArtists[j]
    URLName.innerHTML += '<a target="_blank" href="'+playURIs[j]+'">'+"Open with Spotify"+'</a>';
    countPlay++
  }
}

function removeTable(){
  var tablePlay = document.getElementById("playlistTable");
  while(countPlay>0){
    var row = tablePlay.rows.length;
    tablePlay.deleteRow(row-countPlay)
    countPlay--
  }
}

function addToArray(song, artist, time, uri){
  songs.push(song.toString())
  artists.push(artist.toString())
  times.push(time.toString())
  uris.push(uri.toString())  
}
