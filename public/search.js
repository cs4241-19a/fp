console.log("we got to script")
//let json = './tracks.js'
//const json = require('tracks.js');

window.onload = function (e) {
    let searchButton = document.getElementById("songSearch");
    searchButton.onclick = search;


}

function search() {
    let songName = document.getElementById("songName").value

    let listOfSongNames = []
    let tracks = tracksJson.tracks.items;

    console.log(tracksJson);

    console.log("Number of tracks is " + tracks.length);

    for (let i = 0; i < tracks.length; i++) {
        console.log(tracks[i].name);
    }


}
