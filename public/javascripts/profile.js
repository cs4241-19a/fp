var table;

const getData = function(){
    fetch('/leaderboard',{
        method: 'GET'
    }).then(function(res){
        console.log("got users")
        return res.json()
    }).then(function(json){
        displayTable(json)
    })
    return false 
}

const getHighScore = function(){
  fetch('/scores/highscore', {
      method:'GET',
  })
  .then( function ( response ) {
      console.log( response )
      return response.json()
  })
  .then(function( json ) {
      document.getElementById("highscore").innerHTML = json;
  })
  return false; 
}

// function to make leaderboard appear
const displayTable = function( json ) {
  console.log( json )

  var col = [];
  for (var i = 0; i < json.length; i++) {
    for (var key in json[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  table.innerHTML = ""
  var tr = table.insertRow(-1);

  for (var i = 0; i < col.length; i++) { 
    if(col[i] == "username" || col[i] == "highscore"){
      var th = document.createElement( "th" )
      th.innerHTML = col[i]
      tr.appendChild(th)
    }
  }

  for (var i = 0; i < json.length; i++) {
    tr = table.insertRow(1)

    for (var j = 0; j < col.length; j++) {
      if(col[j] == "username" || col[j] == "highscore"){
          var tabCell = tr.insertCell(-1)
          tabCell.innerHTML = json[i][col[j]]
      } 
    }
  }

  var divContainer = document.getElementById( "leaderBoard" )
  divContainer.innerHTML = ""
  divContainer.appendChild(table)
}

window.onload = function(){
    getHighScore() 
    table = document.createElement("table"); // display leaderboard 
    getData() // load leaderboard
}