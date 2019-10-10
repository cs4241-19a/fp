const admin = require("firebase-admin"),
     serviceAccount = require("./music-final-project-e2a3920fdcdd.json");

exports.init = function(){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://music-final-project.firebaseio.com"
    });
    this.firestore = admin.firestore()
}

exports.addNewUserProfile = function (username, new_profile){
    let profiles_coll = this.firestore.collection("user_profiles")
    profiles_coll.doc(username).set(new_profile).then(r => console.log(r))
}

exports.readUserData = function(username) {
    let user_ref = this.firestore.collection("user_profiles").doc(username);
    return new Promise((resolve, reject) => {
        let myData = {};
        user_ref.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                    resolve(myData)
                } else {
                    console.log('Document data:', doc.data());
                    myData = doc.data();
                    resolve(myData)
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
                reject('Error getting document')
            })
    })
}

exports.readAllUserData = function() {
    let feed_ref = this.firestore.collection("user_profiles");
    return new Promise((resolve, reject) => {
        let myData = [];
        feed_ref.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>',doc.data())
                    myData.push(doc.data());
                });
                resolve(myData)
            })
            .catch(err => {
                console.log('Error getting document', err);
                reject('Error getting document')
            })
    })
}

exports.updateUserPassword = function (username, password) {
    let profiles_coll = this.firestore.collection("user_profiles").doc(username);
    profiles_coll.update({password: password}).then(r => console.log(r));
}

exports.addPost = function (json) {
    let profiles_coll = this.firestore.collection("music_profiles")
    profiles_coll.doc().set(json).then(r => console.log(r))
}

exports.getFeed = function () {
    let profiles_coll = this.firestore.collection("music_profiles")
    return new Promise((resolve, reject) => {
        let myData = [];
        profiles_coll.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>',doc.data())
                    myData.push(doc.data());
                });
                resolve(myData)
            })
            .catch(err => {
                console.log('Error getting document', err);
                reject('Error getting document')
            })
    })
}

