const admin = require("firebase-admin"),
     serviceAccount = require("./music-final-project-e2a3920fdcdd.json");

exports.init = function(){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://music-final-project.firebaseio.com"
    });
    this.firestore = admin.firestore()
}

exports.getRandomData = function (){
    return {}
}