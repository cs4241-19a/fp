function parseDirectory(){
    let dir = "./resources/audio/songs";
    let fs = require('fs');
    let path = require('path');
    // let process = require('process');
    let files = fs.readdirSync(dir);
    let list = [];
        files.forEach(function (subdir, index) {
            list.push(subdir.toString());
            // fs.readdir(subdir, function (err, files) {
            // });
    });
    return JSON.stringify({ "songs" : list});
}
function createSongSelect(){
    parseDirectory()
}
function songSelect(){
    var audio, dir, ext, mylist;
    dir = "resources/audio/";
    ext = ".mp3";
    // Audio Object
    audio = new Audio();
    audio.src = dir+"Jam_On_It"+ext;
    audio.play();
    // Event Handling
    mylist = document.getElementById("mylist");
    mylist.addEventListener("change", changeTrack);
    // Functions
    function changeTrack(event){
        audio.src = dir+event.target.value+ext;
        audio.play();
    }

    var breakDown = JSON.parse(breakDownJSON);
    var easyChart = breakDown.charts[0];
    var mediumChart = breakDown.charts[1];
    var hardChart = breakDown.charts[2];
    console.log("Title: " + breakDown.meta.title);
    console.log("First chart is " + easyChart.diff);
    console.log("Second chart is " + mediumChart.diff);
    console.log("Third chart is " + hardChart.diff);


}

function playsound() {

}
function displaynotes() {

}