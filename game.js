export default function parseSongDirectory(){
    let dir = "./public/resources/audio/songs";
    let fs = require("fs");
    let files = fs.readdirSync(dir); //stackoverflow told me to ignore this warning
    let list = [];
    files.forEach(function (subdir) {
        list.push(subdir.toString());
    });
    return ({"songs": list});
}
