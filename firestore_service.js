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

exports.readData = function(username) {
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

exports.addMusicToProfile = function (username, song){
    let profiles = this.firestore.collection("music_profiles")
    profiles.doc(username).get().then(function(obj){
        prof = obj.data()
        prof.songs.push(song)
        profiles.doc(username).update(prof)
    })
    let posts = this.firestore.collection("posts")
    posts.add({
        user: username,
        date: song.uploaded,
        itemid: song.itemid
    })
}

exports.getMostRecentPosts = function (limit){
    let profiles = this.firestore.collection("music_profiles")
    let posts = this.firestore.collection("posts")
    return new Promise((resolve, reject) => {
        posts.orderBy("date").limit(limit).get().then(function(list){
            post_list = []
            list.data().forEach(p => {
                profiles.doc(p.user).get().then(function(obj){
                    prof = obj.data();
                    song = prof.songs.filter(function(song){
                        return p.itemid == song.itemid;
                    })[0];
                    post_list.push({
                        user: prof.user,
                        song: song
                    }); 
                })
            })
            resolve(post_lists)
        })
    })
    
}