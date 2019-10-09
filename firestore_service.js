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


exports.readFeedData = async function() {
    let feed_posts = await this.firestore.collection("music_profiles").orderBy("postOrder", "desc").limit(10).get();
    return feed_posts;
}

exports.readUserFeed = async function(username){
    let feed_posts = await this.firestore.collection("music_profiles").where("username", "==", username).orderBy("postOrder", "desc").get();
    return feed_posts;
}

exports.getSongData = async function(song_id){
    return await this.firestore.collection("song_data").doc(song_id).get();
}

exports.addSongData = async function(byte_string){
    songs = await this.firestore.collection("song_data").get()
    n_songs = songs.size
    await this.firestore.collection("song_data").doc(n_songs+1).set({
        byte_string: byte_string
    })
    return n_songs+1 //same as new song id
}

exports.addFeedPost = async function(post){
    posts = await this.firestore.collection("music_profiles").get()
    n_posts = posts.size
    post.postOrder = n_posts+1
    await this.firestore.collection("music_profiles").doc(n_posts+1).set(post)
    return n_post+1 //same as new post id
}
